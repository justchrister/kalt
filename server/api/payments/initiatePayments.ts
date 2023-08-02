import { ok } from '~/composables/ok'
import { pub, sub } from '~/composables/messaging'
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
      return data
    }
    if(error){
      ok.log('error', 'could not find payment pending processing in table ')
      return false
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
      message_entity: ok.uuid(),
      transaction_id: payment.transaction_id,
      amount: payment.amount,
      currency: payment.currency,
      userId: payment.userId,
      message_sender: 'server/api/payments/initiatePayments.ts'
    };

    const { data, error } = await supabase
      .from('paymentsPending')
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

  for (let i = 0; i < paymentsPendingProcessing.length; i++) {
    const payment = paymentsPendingProcessing[i];
    const paymentIntent = await createPendingPayments(payment)
  }
  return 'successfully processed all payments pending processing'
});