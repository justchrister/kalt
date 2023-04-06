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

  const { data, error } = await supabase
    .from('components_chart_portfolio')
    .select()
    .eq('user_id', user.value.id)
  
  
  if(error) ok.log('error', 'currency: ', message)
  if(data) ok.log('success', 'got the portfolio currency: ', data)
</script>
<style>
  .chart-sizer{
    height: 100%;
    width: 100%;
    max-height: 100%;
  }
</style>