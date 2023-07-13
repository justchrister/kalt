<template>
  <div>
    <nuxt-link to="/cards">
      <card :number="cardNumberInt" :default="true" />
    </nuxt-link>
  </div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const hasDefaultCard = ref(false)
  const { data, error } = await supabase
    .from('get_payment_card_default')
    .select()
    .limit(1)
    .single()
  if(data) hasDefaultCard.value = true
  if(error) ok.log('error', 'Failed to fetch default card')
  const cardNumberInt = await ok.toInt(data.card_number)
</script>