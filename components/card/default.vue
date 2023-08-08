<template>
  <div>
    <nuxt-link to="/cards">
      <card :number="card.number" :default="true" v-if="card"/>
      <div class="missing-card" v-else> card is missing, add one</div>
    </nuxt-link>
  </div>

</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const { error, data:card } = await supabase
    .from('getPaymentCardDefault')
    .select()
    .eq('userId', user.value.id)
    .limit(1)
    .single()
  if(error) {
    ok.log('', 'Failed to get default card', error)
  } else {
    ok.log('success', 'Got default card', card)
  }
</script>
<style scoped lang="scss">
  
</style>