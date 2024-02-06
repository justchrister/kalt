import { ok } from '~/composables/ok'

export const getPaymentMethod = async (client, user) => {
  const { data, error } = await client
    .from('topic_paymentMethods')
    .select()
    .eq('id', user.id)
    .order('timestamp', { ascending: true })
  if (error) {
    ok.log('error', 'failed getting payment method: '+error.message)
    return null
  } else {
    const combined = ok.merge(data, 'id')[0]
    ok.log('', 'got payment method')
    return ok.cleanMessage(combined)
  }
};