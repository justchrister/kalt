<template>
  <div class="answer-wrap">
    <div class="answer">
      <slot></slot>
    </div>
    <span></span>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped lang="scss">
  .answer-wrap{
    display: grid;  // Changed to flex
    grid-template-columns: 1fr sizer(12) ;
    position:relative;
    min-height: sizer(6);
  }
  .answer{
    display:inline-block;
    background: dark(2%);
    border: $border;
    border-color: dark(100%);
    border-radius: sizer(0.5);
    width: auto;
    max-width: sizer(40);
    margin: sizer(1) 0;
    margin-right: auto;  // Pushes to the right
    white-space: pre-wrap; /* This will preserve the newlines and spaces */
    padding: sizer(1);
  }
</style>