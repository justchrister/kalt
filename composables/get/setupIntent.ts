import { ok } from '~/composables/ok'

export const getSetupIntent = async (client, user) => {
  ok.log('', user.id)
  const { data, error } = await client
    .from('topic_paymentMethods')
    .select()
    .eq('id', user.id)
    .order('timestamp', { ascending: true })
  if(error || !data.intentToken) {
    if(error){
      ok.log('error', 'failed getting payment method: '+error.message)
    }
    const apiResponse = await fetch('/api/paymentMethods/generateIntentToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: user.id
      })
    }) as paymentMethod;
    return apiResponse.intentToken
  } else {
    const combined = ok.merge(data, 'id')[0]
    return combined.intentToken
  }
};