<template>
  <div class="wrap">
    <div class="notification">
      {{ props.message }} <span id="x">x</span>
    </div>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    message: {
      type: String,
      required: true
    }
  })
</script>
<style scoped lang="scss">
.wrap{
  position:fixed;
  height:$clamp-4;
  width:$clamp-40;
  bottom:top;
  right:$clamp-3;
  position:fixed;
  top:$clamp-4;
  z-index:8999;
}
  
  .notification{
    position:relative;
    box-sizing: border-box;
    width:$sitewidth;
    max-width: $maxsitewidth; 
    margin:auto;
    padding:$clamp $clamp-2;
    background:$test-color-5;
    border-color: $test-color;
    color: $test-color;
  }
</style>