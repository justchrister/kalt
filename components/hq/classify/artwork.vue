<template>
  <div>
    <div class="image">
    </div>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    data: {
      type: String,
      required: true
    }
  })
  console.log(props.data)
</script>
<style scoped lang="scss">
  
</style>