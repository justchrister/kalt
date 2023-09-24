<template>
  <div class="answer-wrap">
    <div class="answer">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
</script>
<style scoped lang="scss">
  .answer-wrap{
    display: flex;  // Changed to flex
    justify-content: flex-start;  // Pushes the child to the right
    position:relative;
    width: $clamp-46;
    min-height:$clamp-6;
    margin-right: $clamp-12;
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