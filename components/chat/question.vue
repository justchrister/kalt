<template>
  <div class="question-wrap">
    <span></span>
    <div class="question">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
</script>
<style scoped lang="scss">
  .question-wrap{
    display: grid;  // Changed to flex
    grid-template-columns: $clamp-12 1fr;
    position:relative;
    min-height:$clamp-6;
  }
  .question{
    display:inline-block;
    background: $green-20;
    border: $border;
    border-color: $green;
    border-radius: $clamp-0-5;
    width: auto;
    max-width: $clamp-40;
    margin: $clamp-1 0;
    margin-left: auto;  // Pushes to the right
    padding: $clamp-1;
  }
</style>