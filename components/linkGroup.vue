<template>
  <div class="link-group">
    <slot>
    </slot>
  </div>
</template>
<script setup>
</script>
<style scoped lang="scss">
  
  .link-group{
    width:100%;
    margin: $clamp;
    text-align:center;
  }
  .link-group a{
    margin: $clamp;
  }
</style>