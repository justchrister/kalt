<template>
  <div class="chart-sizer">
    <chart-base-next
      currency="USD"
      :data="data"/>
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
  
  
  if(error) ok.log('error', 'currency: ', message)
  if(data) ok.log('success', 'got the portfolio currency: ', data)
</script>
<style>
</style>