<template>
  <div>
    <div id="payment-element"></div>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    user: {
      type: Object,
      required: true
    }
  });
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = props.user as user;
  const paymentMethod = await get(supabase).paymentMethod(user) as paymentMethod;
  const appearance = { /* appearance */ };
  const options = {    
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
    },
    mode: 'payment',
    amount: 1099,
    setup_future_usage: 'off_session',
    payment_method_configuration: 'pmc_1M6g5zDBFB40Q48wehke7ZMD'
   };
  const loadStripe = async () => {
    const { loadStripe } = await import('@stripe/stripe-js');
    return await loadStripe('pk_test_51IMoMpDBFB40Q48wJYOe24B4jfH6W3UYyRAduNHLP5o8IER2ML2cAMoxGKdwKkYnGBkFoe1dJzdPxj2cPJjfgg6000tUWGXJvZ');
  };

  const createPaymentElement = async (clientSecret: string, stripe: Stripe) => {
    ok.log('', stripe)
    const elements = stripe.elements({ clientSecret });
    const paymentElement = elements.create('payment', options);
    
    paymentElement.mount('#payment-element');
  };

  onMounted(async () => {
    try {
      const stripe = await loadStripe();
      if (stripe) {
        await createPaymentElement(paymentMethod.intentToken, stripe);
      } else {
        console.error('Stripe failed to load');
      }
    } catch (error) {
      console.error('Error loading Stripe:', error);
    }
  });

</script>
<style scoped lang="scss">
  
</style>