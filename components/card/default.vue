<template>
  <div>
    <nuxt-link to="/cards" v-if="defaultCard">
      <card :number="defaultCard.number" :default="true"/>
    </nuxt-link>
  </div>

</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const userId = useSupabaseUser()
  const user = await get(supabase).user(userId.value.id)
  const defaultCard = await get(supabase).defaultPaymentCard(user);
  if(!defaultCard) {
    ok.log('error', 'User does not have default card')
    await navigateTo('/cards')
  }

</script>
<style scoped lang="scss">
  
</style>