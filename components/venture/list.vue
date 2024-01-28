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
    grid-gap: sizer(1);
    gap: sizer(1);
  }
</style>