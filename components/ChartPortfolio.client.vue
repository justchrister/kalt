<template>
  <div class="chartWrap">
    <chart-base 
      :currency="data.preferred_currency"
      :data="dataset"
      label="label"/>
  </div>
</template>
<script lang="ts" setup>
// if we have two lines

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
  const {data: {user}} = await supabase.auth.getUser()
  const labels = ['lol']
  const dataset = ref({})
  const days = ref(5)
  const { data } = await supabase
  .from('accounts')
  .select('preferred_currency')
  .single()
  const initateChart =  () => {
    const { pending, data: tempdataset } = useFetch('/api/exchange/getPortfolio?days='+props.days+'&user_id='+user.id+'&currency='+data.preferred_currency)
    watch(tempdataset, (rawDataset) => {
      dataset.value = rawDataset
    })
  }
  initateChart()
  watch(() => props.days, () => initateChart() )
</script>