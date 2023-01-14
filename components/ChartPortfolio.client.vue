<template>
  <div class="chartWrap">
    <chart-base 
      currency="NOK"
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
  }
})
  const supabase = useSupabaseClient()
  const {data: {user}} = await supabase.auth.getUser()
  const labels = ['lol']
  const dataset = ref({})
  const days = ref(5)
  const initateChart =  () => {
    const { pending, data: tempdataset } = useFetch('/api/exchange/getPortfolio?days='+props.days+'&user_id='+user.id)
    watch(tempdataset, (rawDataset) => {
      dataset.value = rawDataset
    })
  }
  initateChart()
  watch(() => props.days, () => initateChart() )
</script>