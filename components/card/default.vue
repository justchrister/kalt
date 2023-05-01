<template>
  <div>
    <nuxt-link to="/cards" v-if="data.card_number">
      <card :number="cardNumberInt" :default="data.default" />
    </nuxt-link>
    <span v-else>
      <card-add/>
    </span>
  </div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const { data, error } = await supabase
    .from('get_payment_card_default')
    .select()
    .limit(1)
    .single()
    .eq('default', true)
  if(error) ok.log('error', 'Failed to get default card: ', error)
  const cardNumberInt = await ok.toInt(data.card_number)  
</script>
