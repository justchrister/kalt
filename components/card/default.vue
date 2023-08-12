<template>
  <div>
    <nuxt-link to="/cards" v-if="defaultCard">
      <card :number="defaultCard" :default="true"/>
    </nuxt-link>
  </div>

</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const getPaymentCardDefault = async () => {
    const { data, error } = await supabase
      .from('getPaymentCardDefault')
      .select()
      .eq('userId', user.value.id)
      .limit(1)
      .single()
    if(data) {
      ok.log('', 'Got default card: ', data)
      if(data.number){
        return data.number
      } else {
        ok.log('', 'Failed to get default card',data)
        return false
      }
    }
    if(error) {
      ok.log('', 'Failed to get default card')
      ok.log('', error)
      return false
    }
  }
  const defaultCard = await getPaymentCardDefault();
  if(defaultCard){
    ok.log('', 'User has default card')
  } else {
    ok.log('error', 'User does not have default card')
    await navigateTo('/cards')
  }

</script>
<style scoped lang="scss">
  
</style>