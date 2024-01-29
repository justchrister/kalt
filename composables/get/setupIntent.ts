import { ok } from '~/composables/ok'

export const getSetupIntent = async (client, user) => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const { data, error } = await client
    .from('topic_paymentMethods')
    .select()
    .eq('id', user.id)
    .eq('used', false)
    .gte('timestamp', yesterday.toISOString())
    .order('timestamp', { ascending: false })
    .limit(1)
    .single()
  if(error || !data.intentToken) {
    if(error){
      ok.log('error', 'failed getting payment method: '+error.message)
    }
    const apiResponse = await fetch('/api/paymentMethods/generateIntentToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user})
    });
    if(!apiResponse.intentToken){
      return 
    } else {
      return apiResponse.intentToken
    }
  } else {
    const combined = ok.merge(data, 'id')[0]
    return combined.intentToken
  }
};