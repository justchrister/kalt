import { ok } from '~/composables/ok'
import { pub, sub } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server'
import Stripe from 'stripe';

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event);
  const body = await readBody(event);
  const topic = 'paymentsPending';
  const service = 'aclStripe';
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY) as Stripe;
  if (body.record.message_read) return 'message already read';

  const message = await sub(supabase, topic).entity(body.record.message_entity);
  await sub(supabase, topic).read(service, body.record.message_id);  

  if(message.status !== 'pending') return 'message status is not pending';
  if(message.provider !== 'stripe') return 'charge is not for Stripe';
  const amountCents = message.amount*100;
  const currencyLower = message.currency.toLowerCase();

  const chargeCard = async (customerId, cardId) => {
    try {
      const charge = await stripe.paymentIntents.create({
        amount: amountCents, 
        currency: currencyLower,
        description: message.transactionId,
        customer: customerId,
        payment_method: cardId,
        off_session: true, // Set to true if customer is not present
        confirm: true, // This will automatically confirm the payment
      });
      
      ok.log('success', charge);
      return 'success'
    } catch (error: any) {
      ok.log('error', 'failed to charge '+customerId+' / '+message.userId+': ', error.statusCode+': '+error.raw.message);
      return 'error'
    }
  }
  const updatePaymentPendingStatus = async (status: string) => {
    const error = await pub(supabase, {
      entity: message.message_entity,
      sender: 'service/api/acl/stripe/webhooks/paymentsPending.ts'
    }).paymentsPending({
      userId: message.userId,
      transactionId: message.transactionId,
      provider: 'stripe',
      status: status
    } as paymentsPending);
    if(error){
      ok.log('error', 'error updating payment pending status', error)
      return 'error'
    } else {
      ok.log('success', 'updated payment pending status')
      return 'success'

    }
  }
  const updateTransactionStatus = async (status: string) => {
    const error = await pub(supabase, {
      sender:'server/api/acl/stripe/webhooks/paymentsPending.ts',
      entity: message.transactionId
    }).accountTransactions({
      userId: message.userId,
      status: status
    });
    if(error){
      ok.log('error', 'error updating transaction status', error)
    }
  }
  const getStripeIds = async (userId: string) => {
    const { data, error } = await supabase
      .from('acl_stripe')
      .select()
      .eq('userId', userId)
      .limit(1)
      .single()
    if(data){
      return data as any
    }
  }

  const paymentPendingStatus = await updatePaymentPendingStatus('processing')
  
  if(paymentPendingStatus=='success') await updateTransactionStatus('processing')
  if(paymentPendingStatus=='error') return 'failed to set as processing'

  const stripeIds = await getStripeIds(message.userId);

  const charge = await chargeCard(stripeIds?.stripeCustomerId, stripeIds?.stripeCardId)

  if(charge=='success') await updatePaymentPendingStatus('complete')
  if(charge=='success') await updateTransactionStatus('complete')
  if(charge=='error') await updatePaymentPendingStatus('failed')
  
  return charge
});