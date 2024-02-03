import { ok } from '~/composables/ok'

export const getDefaultPaymentMethod = async (client, user) => {
  if(!user.id){
    return {
      data: null, 
      error: {
        status: 501,
        message: 'Failed getting default payment method. Missing user.id'
      }
    }
  }
  const { data, error } = await client
    .from('topic_paymentMethods')
    .select('')
    .eq('id', user.id)
    .order('timestamp', { ascending: true })
  let paymentMethod = data[0];
  if(data.length>1){
    paymentMethod = ok.merge(data, 'id')[0];
  }
  try{
    const response = await $fetch('/api/paymentMethods/default', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user, paymentMethod })
    });
    return await response;
  } catch (error) {
    return {
      data: null,
      error: {
        status: 501,
        message: 'failed getting default payment method'
      }
    }
  }
};