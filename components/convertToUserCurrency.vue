<template>
  <span>
    {{ formattedAmount }}
  </span>
</template>
<script setup lang="ts">
  const props = defineProps({
    amount: {
      type: Number,
      required: true
    }
  })
  const supabase = useSupabaseClient()
  const userId = useSupabaseUser()
  const user = await get(supabase).user(userId.value.id) || null;

  const formattedAmount = ref();
  if(!userId || !user || !user.currency){
    formattedAmount.value=ok.formatCurrency(props.amount, 'USD')
  } else {
    const amountConverted = await ok.convertCurrency(supabase, props.amount, 'USD', user.currency)
    formattedAmount.value=ok.formatCurrency(amountConverted, user.currency)
  }
</script>
<style scoped lang="scss">
  
</style>