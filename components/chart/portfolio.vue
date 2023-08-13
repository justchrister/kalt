<template>
    <chart-base :days="props.days" v-if="datapoints"/>
</template>
<script setup lang="ts">
  const props = defineProps({
    days: {
      type: Number,
      required: true
    }
  })
  let datapoints = [] as any;
  let labels = [] as any;
  
</script>
<style scoped lang="scss">
  
</style>