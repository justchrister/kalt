<template>
  <div class="wrap-notification" :id="props.color">
    {{ props.message }} <span id="x">x</span>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    message: {
      type: String,
      required: true
    },
    color:{
      type: String,
      required: false
    }
  })
</script>
<style scoped lang="scss">
  
  .wrap-notification{
    position:fixed;
    bottom:$clamp-4;
    z-index:8999;
    box-sizing: border-box;
    width:$sitewidth;
    max-width: $maxsitewidth; 
    margin:auto;
    padding:$clamp $clamp-2;
  }
  #yellow{
    background: $yellow-20;
    border-color:$yellow;
  }
  #green{
    background:$green-20;
    border-color: $green;
  }
  #red{
    background:$red-20;
    border-color: $red;
  }
  #x{
    float:right;
    cursor:pointer;
  }
</style>