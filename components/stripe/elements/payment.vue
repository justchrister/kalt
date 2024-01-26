<template>
  <div>
    <div id="payment-element"></div>
    <span v-if="loading">
      <p class="loading-wrapper">Loading <loading-icon/></p>
    </span>
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

  const loading = ref(true);

  const appearance = { /* appearance */ };
  const options = {
    layout: {
      type: 'accordion',
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: true
    }
   };
  const loadStripe = async () => {
    const { loadStripe } = await import('@stripe/stripe-js');
    return await loadStripe('pk_test_51IMoMpDBFB40Q48wJYOe24B4jfH6W3UYyRAduNHLP5o8IER2ML2cAMoxGKdwKkYnGBkFoe1dJzdPxj2cPJjfgg6000tUWGXJvZ');
  };

  const createPaymentElement = async (clientSecret: string, stripe: Stripe) => {
    const elements = stripe.elements({ clientSecret });
    const paymentElement = elements.create('payment', options );
    paymentElement.mount('#payment-element');
  };

  onMounted(async () => {
    try {
      const stripe = await loadStripe();
      if (stripe) {
        await createPaymentElement(paymentMethod.intentToken, stripe);
        loading.value = false;
      } else {
        console.error('Stripe failed to load');
      }
    } catch (error) {
      console.error('Error loading Stripe:', error);
    }
  });

</script>
<style scoped lang="scss">
  .loading-wrapper{
    transform: scale(2);
  }
</style>