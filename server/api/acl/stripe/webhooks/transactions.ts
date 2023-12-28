import { ok } from '~/composables/ok'
import { pub, sub } from '~/composables/messaging';
import { serverSupabaseServiceRole } from '#supabase/server'
import Stripe from 'stripe';

export default defineEventHandler( async (event) => {
  
  const keyPair = await ok.verifyKeyPair(event);
  if(!keyPair) return 'unauthorized';

  const supabase = serverSupabaseServiceRole(event);
  const body = await readBody(event);
  const topic = 'transactions';
  const service = 'aclStripe';
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY) as Stripe;
  if (body.record.read) return 'message already read';

  const message = await sub(supabase, topic).entity(body.record.id);
  await sub(supabase, topic).read(service, body.record.event);
  if(message.status !== 'pending') return 'transaction not pending payment';
  if(message.type !== 'deposit') return 'transaction not deposit';
  if(message.subType !== 'card') return 'transaction not card';

  const amountCents = message.amount*100;
  const currencyLower = message.currency.toLowerCase();

  const chargeCard = async (customerId: string, cardId: string) => {
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
  const updateTransactionStatus = async (status: string, entity: string, userId: string) => {
    const error = await pub(supabase, {
      entity: entity,
      sender: 'service/api/acl/stripe/webhooks/transactions.ts'
    }).transactions({
      userId: userId,
      status: status
    } as transaction);
    if(error){
      ok.log('error', 'error updating payment pending status', error)
      return 'error'
    } else {
      ok.log('success', 'updated payment pending status')
      return 'success'
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

  const transactionStatus = await updateTransactionStatus('processing', message.id, message.userId)

  if(transactionStatus=='error') {
    return 'failed to set as processing'
  } else {
    const stripeIds = await getStripeIds(message.userId);
    if(!stripeIds || !stripeIds.stripeUserId || !stripeIds.stripeCardId) return 'no stripe ids found'
    const charge = await chargeCard(stripeIds?.stripeUserId, stripeIds?.stripeCardId)
    if(charge==='success'){
      await updateTransactionStatus('complete', message.id, message.userId)
      return charge
    } else {
      await updateTransactionStatus('failed', message.id, message.userId)
      return 'failed to charge card'
    }
  }

});