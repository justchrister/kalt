<template>
  <div>
    <nuxt-link to="/cards" v-if="card">
      <card :number="data.number" :default="true" />
    </nuxt-link>
    <nuxt-link to="/cards" v-else>
      card is missing, add one
    </nuxt-link>
  </div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const getDefaultCard = async () => {
    const { error, data } = await supabase
      .from('getPaymentCardDefault')
      .select()
      .limit(1)
      .single()
    if(error) {
      return false
    } else {
      return data
    }
  }
  const card = await getDefaultCard();
</script>