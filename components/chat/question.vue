<template>
  <div class="question-wrap">
    <div class="question">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
</script>
<style scoped lang="scss">
  .question-wrap{
    display: flex;  // Changed to flex
    justify-content: flex-end;  // Pushes the child to the right
    position:relative;
    width: $clamp-46;
    min-height:$clamp-6;
    margin-left: $clamp-12;
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