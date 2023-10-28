<template>
  <div :id="props.id">{{ props.id }}</div>
</template>
<script setup lang="ts">
  const props = defineProps({
    id: {
      type: String,
      required: true
    }
  })
</script>
<style scoped lang="scss">
  div{
    width:$clamp-10;
    text-align:center;
    display:inline-block;
  }
</style>