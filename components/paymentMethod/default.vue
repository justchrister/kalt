<template>
  <div v-if="defaultPaymentMethod.type==='card' || !error" @click="nav()">
    <payment-method-card :lastFour="defaultPaymentMethod.card.last4" :brand="defaultPaymentMethod.card.brand"/>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    user: {
      type: Object,
      required: true
    },
    link: {
      type: Boolean,
      required: false,
      default: false
    }
  })
  const supabase = useSupabaseClient();
  const user = props.user as user;
  const {data: defaultPaymentMethod, error} = await get(supabase).defaultPaymentMethod(user);
  const nav = () => {
    if(!props.link) return;
    navigateTo('/payment-methods')
  }
</script>
<style scoped lang="scss">
  
</style>