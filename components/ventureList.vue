<template>
  <div>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped lang="scss">
  div{
    display:grid; 
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: $clamp-1;
    gap: $clamp-1;
  }
</style>