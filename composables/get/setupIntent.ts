export const getSetupIntent = async (user) => {
  try{
    const response = await $fetch('/api/paymentMethods/generateSetupIntent', {
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