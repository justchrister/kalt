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
  height:sizer(4);
  width:sizer(40);
  bottom:top;
  right:sizer(3);
  position:fixed;
  top:sizer(4);
  z-index:8999;
}
  
  .notification{
    position:relative;
    box-sizing: border-box;
    width:$sitewidth;
    max-width: $maxsitewidth; 
    margin:auto;
    padding:sizer(1) sizer(2);
    background:primaryColor(5);
    border-color: $test-color;
    color: $test-color;
  }
</style>