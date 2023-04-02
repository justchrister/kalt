<template>
  <div class="chart-sizer">
    <chart-base 
      :currency="data.preferred_currency"
      :data="dataset"/>
    <p v-if="dataset[0]">
      {{prettyCurrency(Math.floor(dataset[0].quantity), data.preferred_currency)}} (+20%)
    </p>
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

  const dataset = ref({})
  const days = ref(5)
  const { data } = await supabase
    .from('profiles')
    .select('preferred_currency')
    .single()
  const initateChart =  () => {
    const { pending, data: tempdataset } = useFetch('/api/exchange/getPortfolio?days='+props.days+'&user_id='+user.value.id+'&currency='+data.preferred_currency)
    watch(tempdataset, (rawDataset) => {
      dataset.value = rawDataset
    })
  }

  const prettyCurrency = (amount, currency) =>{
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    });
    return formatter.format(amount)
  }
  initateChart()
  watch(() => props.days, () => initateChart() )
</script>
<style>
  .chart-sizer{
    height: 100%;
    width: 100%;
    max-height: 100%;
  }
</style>