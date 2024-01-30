export const getSetupIntent = async (user: user) => {
  try {
    const response = await fetch('/api/paymentMethods/generateSetupIntent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};