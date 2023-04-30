<template>
  <span @click="navigateTo(to)"><omoji emoji="←"/> back</span>
</template>
<script setup lang="ts">
  const props = defineProps({
    to: {
      type: String,
      required: true
    }
  })
</script>
<style scoped lang="scss">
  span:hover{
    cursor:pointer;
    text-decoration: underline;
  }
</style>