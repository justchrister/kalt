<template>
  <div>
    <nuxt-link to="/cards" v-if="data">
      <card :number="data.number" :default="true" />
    </nuxt-link>
  </div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const hasDefaultCard = ref(false)
  const { data, error } = await supabase
    .from('getPaymentCardDefault')
    .select()
    .limit(1)
    .single()
  if(data) hasDefaultCard.value = true
  if(error) ok.log('error', 'Failed to fetch default card')
</script>