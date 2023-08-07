<template>
  <div>
    <nuxt-link to="/cards" v-if="card">
      <card :number="data.number" :default="true" />
    </nuxt-link>
  </div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const hasDefaultCard = ref(false)
  const getDefaultCard = async () => {
    const { data } = await supabase
      .from('getPaymentCardDefault')
      .select()
      .limit(1)
      .single()
    if(data) {
      return data
    } else {
      return false
    }
  }
  const card = await getDefaultCard();
  if(data) hasDefaultCard.value = true
  if(error) ok.log('error', 'Failed to fetch default card')
</script>