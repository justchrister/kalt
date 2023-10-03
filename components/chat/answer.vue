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
    grid-template-columns: 1fr $clamp-12 ;
    position:relative;
    min-height:$clamp-6;
  }
  .answer{
    display:inline-block;
    background: $blue-20;
    border: $border;
    border-color: $blue;
    border-radius: $clamp-0-5;
    width: auto;
    max-width: $clamp-40;
    margin: $clamp-1 0;
    margin-right: auto;  // Pushes to the right
    padding: $clamp-1;
  }
</style>