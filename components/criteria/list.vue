<template>
  <div>
    <span></span>
    <span>
      <slot></slot>
    </span>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped lang="scss">
  div{
    display:grid; 
    grid-template-columns: 1fr 2fr;
  }
</style>