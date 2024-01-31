export const getDefaultPaymentMethod = async (user) => {
  const response = await $fetch('/api/paymentMethods/default', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user })
  });
  return await response;
};