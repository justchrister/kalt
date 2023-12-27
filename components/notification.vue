<template>
  <div class="wrap" :id="props.type">
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
  ok.log('', props.type)
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
  }
  .notify{
    box-sizing: border-box;
    width: $sitewidth;
    max-width: $maxsitewidth; 
    margin:auto;
    padding: sizer(1) 0;
  }
  #warn{
    background: $yellow-20;
    border-top-color: $yellow;
  }
  #success{
    background: $green-20;
    border-top-color: $green;
  }
  #error{
    background: $red-20;
    border-top-color: $red;
  }
</style>