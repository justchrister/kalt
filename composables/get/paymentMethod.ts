import { ok } from '~/composables/ok'

export const getPaymentMethod = async (client, user) => {
  ok.log('', user.id)
  const { data, error } = await client
    .from('topic_paymentMethods')
    .select()
    .eq('id', user.id)
    .order('timestamp', { ascending: true })
  if (error) {
    ok.log('error', 'failed getting payment method: ', error)
    return null
  } else {
    const combined = ok.merge(data, 'id')[0]
    return ok.cleanMessage(combined)
  }
};