import { ok } from '~/composables/ok'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler( async (event) => {
  const supabase = serverSupabaseServiceRole(event)
  const getPaymentsPendingProcessing = async () => {
    const { data, error } = await supabase
      .from('payments')
      .update({ processing: true})
      .select()
      .eq('processing', false)
    if(data){
      ok.log('success', 'found payment pending processing in table ', data)
    }
  }
  const returnToProcessing = async (id) => {
    const { data, error } = await supabase
      .from('payments')
      .update({ processing: false})
      .select()
      .eq('transaction_id', id)    
  }
  const createPendingPayments = async (payment) => {
    const json = {
      message_id: ok.uuid(),
      message_entity_id: ok.uuid(),
      transaction_id: payment.transaction_id,
      amount: payment.amount,
      currency: payment.currency,
      user_id: payment.user_id
    };

    const { data, error } = await supabase
      .from('payments_pending')
      .insert(json)
      .select()
    if(error) {
      const returnedToProcessing = await returnToProcessing(payment.transaction_id);
      ok.log('error', 'could not create pending payment', error)
      return error
    }
    if(data){
      ok.log('success', 'created pending payment', data)
      return data
    }
  }
  const paymentsPendingProcessing = await getPaymentsPendingProcessing()
  if(!paymentsPendingProcessing) return 'no payments pending processing'

  for (let i = 0; i < paymentsPendingProcessing.length; i++) {
    const payment = paymentsPendingProcessing[i];
    const paymentIntent = await createPendingPayments(payment)
  }
  return 'successfully processed all payments pending processing'
});