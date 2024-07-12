<template>
  <div class="wrapper">
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    energy: {
      type: Number,
      required: true
    },
    art: {
      type: Number,
      required: true
    },
    smallBusiness: {
      type: Number,
      required: true
    },
    accessibleHousing: {
      type: Number,
      required: true
    },
  })
</script>
<style scoped lang="scss">
  
</style>