<template>
  <div>
    <div id="payment-element"></div>
    <span v-if="loading"><loading-icon/>
    </span>
    <button @click="handleSubmit()">Save default payment method</button>
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
  const runtimeConfig = useRuntimeConfig()

  const stripePublicKey = runtimeConfig.public.STRIPE_PUBLIC_KEY;
  console.log(runtimeConfig.public)
  const user = props.user as user;
  const paymentMethod = await get(supabase).paymentMethod(user) as paymentMethod;

  const loading = ref(true);
  const stripe = ref(null);
  const paymentElement = ref(null);
  const elementsGroup = ref(null)
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
    return await loadStripe(stripePublicKey);
  };

  const createPaymentElement = async (clientSecret: string) => {
    elementsGroup.value = stripe.value.elements({ clientSecret });
    paymentElement.value = elementsGroup.value.create('payment', options);
    if (paymentElement.value) {
      paymentElement.value.mount('#payment-element');
    }
  };

  const handleSubmit = async () => {
    if (!stripe.value || !paymentElement.value) {
      console.error('Stripe has not been initialized correctly.');
      return;
    }

    loading.value = true;
    ok.log('', paymentElement.value)
    const result = await stripe.value.confirmSetup({
      elements: elementsGroup.value,
      confirmParams: {
        return_url: process.env.STRIPE_RETURN_URL
      },
    });

    if (result.error) {
      console.error('Error in saving payment method:', result.error.message);
    } else {
      console.log('Payment method saved successfully:', result.setupIntent.payment_method);
    }

    loading.value = false;
  };

  onMounted(async () => {
    try {
      stripe.value = await loadStripe();
      if (stripe.value) {
        await createPaymentElement(paymentMethod.intentToken);
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