<template>
  <div>
    <p>criteria:</p>
    <ol>
      <slot></slot>
    </ol>
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