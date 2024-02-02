export const getDefaultPaymentMethod = async (client, user) => {
  if(!user.id){
    return {
      data: null, 
      error: {
        status: 501,
        message: 'failed getting default payment method'
      }
    }
  }
  const { data: orders, error } = await client
    .from('topic_paymentMethods')
    .select('')
    .eq('id', user.id)
    .order('timestamp', { ascending: true })
  try{
    const response = await $fetch('/api/paymentMethods/default', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user })
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