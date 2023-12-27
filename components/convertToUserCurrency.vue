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
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth) || null;

  const formattedAmount = ref();
  if(!user){
    formattedAmount.value=ok.formatCurrency(props.amount, 'USD')
  } else {
    formattedAmount.value=ok.formatCurrency(props.amount, user.currency)
  }
</script>
<style scoped lang="scss">
  
</style>