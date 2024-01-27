<template>
  <div>
    <div id="payment-element"></div>
    <loading-icon v-if="loading"/>
    <input-button @click="handleSubmit()"><loading-icon v-if="loading"/> save payment method</input-button>
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

  const stripePublicKey = runtimeConfig.public.STRIPE_PUBLIC_KEY as string;
  const stripeReturnUrl = runtimeConfig.public.STRIPE_RETURN_URL as string;
  const user = props.user as user;
  const paymentMethod = await get(supabase).paymentMethod(user) as paymentMethod;

  const loading = ref(true);
  const stripe = ref(null);
  const paymentElement = ref(null);
  const elementsGroup = ref(null)

  const colors = {
    dark: '#161719',
    light: '#FEFDFA',
    border: '#a1a1a0',
    background: '#fcfcf9'
  }

  const appearance = { 
    theme: 'stripe',
    variables: {
      fontFamily: 'Sohne, system-ui, sans-serif',
      fontWeightNormal: '400',
      borderRadius: '3px',
      colorBackground: colors.background,
      colorPrimary: colors.dark,
      accessibleColorOnColorPrimary: colors.dark,
      colorText: colors.dark,
      colorTextSecondary: colors.dark,
      colorTextPlaceholder: '#727F96',
      tabIconColor: colors.dark,
      logoColor: 'dark'
    },
    rules: {
      '.Input, .Block': {
        backgroundColor: 'transparent',
        border: '1px solid '+colors.border
      },
      '.Tab--selected': {
        borderColor: colors.border,
      },
      '.Tab:focus': {
        borderColor: colors.dark,
      },
      '.Input': {
        border: '1px solid '+colors.border
      }
    }
  };

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
    elementsGroup.value = stripe.value.elements({ clientSecret, appearance });
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
    const result = await stripe.value.confirmSetup({
      elements: elementsGroup.value,
      confirmParams: {
        return_url: stripeReturnUrl
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