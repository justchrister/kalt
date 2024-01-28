<template>
  <div class="wrap">
    <div class="notify">
      {{ props.message }}
    </div>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    type: {
      type: String,
      required: false
    },
    message: {
      type: String,
      required: false
    }
  })
</script>
<style scoped lang="scss">
  .wrap{
    position:fixed;
    width:100vw;
    bottom:0;
    padding: sizer(1) 0;
    border-top: $border;
    z-index:2;
    left: 0;
    right: 0;
    @include border;
    @include hoverable;
    &:hover{
      @include hovering;
    }
  }
  .notify{
    box-sizing: border-box;
    width: $sitewidth;
    max-width: $maxsitewidth; 
    margin:auto;
    padding: sizer(1) 0;
  }
</style>