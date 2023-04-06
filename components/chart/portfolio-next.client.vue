<template>
  <div class="chart-sizer">
    <chart-base 
      :currency="data.preferred_currency"
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
  
</script>
<style>
  .chart-sizer{
    height: 100%;
    width: 100%;
    max-height: 100%;
  }
</style>