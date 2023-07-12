import { ok } from '~/composables/ok'
import { messaging } from '~/composables/messaging'
import { serverSupabaseServiceRole } from '#supabase/server'
import Stripe from 'stripe';
export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const body = await readBody(event)
  const topic = 'paymentsPending';
  const service = 'aclStripe';
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // your stripe key here
  if (body.record.message_read) return 'message already read';

  const message = await messaging.getEntity(supabase, topic, body.record.message_entity_id) as any;
  await messaging.read(supabase, topic, service, body.record.message_id);  

  if(message.status !== 'pending') return 'message status is not pending';
  if(message.provider !== 'stripe') return 'charge is not for Stripe';
  const amountCents = message.amount*100;
  const currencyLower = message.currency.toLowerCase();

  const chargeCard = async (customerId) => {
    try {
      const charge = await stripe.charges.create({
        amount: amountCents, 
        currency: currencyLower,
        description: message.transaction_id,
        customer: customerId,
      });
      
      ok.log('success', charge);
      return 'success'
    } catch (error) {
      ok.log('error', 'failed to charge '+customerId+' / '+message.user_id+': ', error);
      return 'error'
    }
  }
  const updatePaymentPendingStatus = async (status) => {
    const { data, error } = await supabase
      .from('payments_pending')
      .insert({
        message_id: ok.uuid(),
        message_entity_id: message.message_entity_id,
        message_sender: 'service/api/acl/stripe/_paymentsPending.ts',
        user_id: message.user_id,
        transaction_id: message.transaction_id,
        status: status
      })
      .select()
    if(data) {
      ok.log('success', 'updated payment pending status')
      return 'success'
    }
    if(error){
      ok.log('error', 'error updating payment pending status', error)
      return 'error'
    } 
  }
  const updateTransactionStatus = async (status) => {
    const { data, error } = await supabase
      .from('account_transactions')
      .insert({
        message_id: ok.uuid(),
        message_entity_id: message.transaction_id,
        user_id: message.user_id,
        status: status
      })
      .select()
  }
  const getCustomerId = async (userId) => {
    const { data, error } = await supabase
      .from('acl_stripe_user_ids')
      .select()
      .eq('user_id', userId)
      .limit(1)
      .single()
    if(data){
      return data.stripe_user_id
    }
  }

  const paymentPendingStatus = await updatePaymentPendingStatus('processing')
  
  if(paymentPendingStatus=='success') await updateTransactionStatus('processing')
  if(paymentPendingStatus=='error') return 'failed to set as processing'

  const stripeCustomerId = await getCustomerId(message.user_id)
  const charge = await chargeCard(stripeCustomerId)

  if(charge=='success') await updatePaymentPendingStatus('complete')
  if(charge=='error') await updatePaymentPendingStatus('failed')
  
  return charge
});