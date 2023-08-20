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
    if(data && data.length > 0){
      ok.log('success', 'found payment pending processing in table ', data)
      return data
    } else {
      ok.log('error', 'could not find payment pending processing in table ')
      return false
    }
  }
  const returnToProcessing = async (id) => {
    const { data, error } = await supabase
      .from('payments')
      .update({ processing: false})
      .select()
      .eq('transactionId', id)    
  }
  const createPendingPayments = async (payment) => {
    const { error, data } = await pub(supabase, {
      sender:'server/api/payments/initiatePayments.ts',
      entity: payment.transactionId
    }).paymentsPending({
      transactionId: payment.transactionId,
      amount: payment.amount,
      status: 'pending',
      provider: 'stripe',
      currency: payment.currency,
      userId: payment.userId,
    });
    if(error) {
      await returnToProcessing(payment.transactionId);
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
    await createPendingPayments(paymentsPendingProcessing[i])
  }
  return 'successfully processed all payments pending processing'
});