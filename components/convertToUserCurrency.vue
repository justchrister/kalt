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
  if(!userId){
    formattedAmount.value=ok.formatCurrency(props.amount, 'USD')
  } else {
    formattedAmount.value=ok.formatCurrency(props.amount, user.currency)
  }
</script>
<style scoped lang="scss">
  
</style>