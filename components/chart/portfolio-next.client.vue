<template>
  <div class="chart-sizer">
    <chart-base 
      currency="USD"
      :data="dataset"/>
  </div>
</template>
<script lang="ts" setup>
  const props = defineProps({
    days: {
      type: Number,
      required: false
    },
    currency: {
      type: String,
      required: false
    }
  })
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  
  const { data: { portfolio }} = await useFetch('/api/getPortfolioDaily', {
    headers: useRequestHeaders(['cookie'])
  })
  console.log(portfolio)
  const { data, error } = await supabase
    .from('profiles')
    .select('preferred_currency')
    .eq('user_id', user.value.id)
  if(error) ok.log('error', 'currency: ' + error.message)
  if(data) ok.log('success', 'got it: '+data)
</script>
<style>
  .chart-sizer{
    height: 100%;
    width: 100%;
    max-height: 100%;
  }
</style>