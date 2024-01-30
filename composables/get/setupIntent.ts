export const getSetupIntent = async (user) => {
  const response = await $fetch('/api/paymentMethods/generateSetupIntent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user })
  });
  return await response;
};