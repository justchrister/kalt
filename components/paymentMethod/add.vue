<template>
  <div>
    <div :class="!loading ? true : 'loaded'">
      <div id="payment-element"></div>
      <input-button @click="handleSubmit()"><loading-icon v-if="loading"/> {{ props.buttonLabel }} </input-button>
    </div>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    user: {
      type: Object,
      required: true
    },
    buttonLabel: {
      type: String,
      default: 'save payment method',
      required: false
    },
    submitRedirect: {
      type: String,
      default: '/payment-methods',
      required: false
    }
  });
  const supabase = useSupabaseClient()
  const runtimeConfig = useRuntimeConfig()

  const stripePublicKey = runtimeConfig.public.STRIPE_PUBLIC_KEY as string;
  const stripeReturnUrl = runtimeConfig.public.STRIPE_RETURN_URL as string;
  const user = props.user as user;
  const { data: setupIntent, error: setupIntentError } = await get(supabase).setupIntent(user);
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
      return;
    }

    loading.value = true;
    const result = await stripe.value.confirmSetup({
      elements: elementsGroup.value,
      redirect: 'if_required'
    });
    if (!result.error) {
      const error = await pub(supabase, {
        sender: 'components/addPaymentMethod.vue',
        id: user.id
      }).paymentMethods({
        id: user.id, 
        provider: 'stripe',
        intentToken: setupIntent.intentToken,
        methodId: result.setupIntent.payment_method
      })
      if(!error) {
        ok.log('success', 'created payment method')
        navigateTo(props.submitRedirect)
      } else {
        ok.log('error', 'failed to save payment method')
      }
    }

    loading.value = false;
  };

  onMounted(async () => {
    try {
      stripe.value = await loadStripe();
      if (stripe.value) {
        await createPaymentElement(setupIntent.intentToken);
        loading.value = false;
      }
    } catch (error) {
      ok.log('error', 'could not load Stripe:', error);
    }
  });

</script>
<style scoped lang="scss">
  .loading{
    opacity: 0  ;
  }
</style>