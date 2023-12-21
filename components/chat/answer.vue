<template>
  <div class="answer-wrap">
    <div class="answer">
      <slot></slot>
    </div>
    <span></span>
  </div>
</template>
<script setup>
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
    background: $blue-20;
    border: $border;
    border-color: $blue;
    border-radius: sizer(0.5);
    width: auto;
    max-width: sizer(40);
    margin: sizer(1) 0;
    margin-right: auto;  // Pushes to the right
    padding: sizer(1);
  }
</style>