<template>
  <div class="wrap">
    <div class="notify" :id="props.type">
      {{props.message}}
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    type: {
      type: String,
      required: false
    },
    message: {
      type: String,
      required: true
    }
  })
</script>
<style scoped lang="scss">
  .wrap{
    position:fixed;
    width:100vw;
    bottom:$clamp-2;
    z-index:2;
    left: 0;
    right: 0;
  }
  .notify{
    box-sizing: border-box;
    border:$border;
    background: $blue;
    border-color:$blue;
    width:$sitewidth;
    max-width: $maxsitewidth; 
    margin:auto;
    padding:$clamp $clamp-2;
  }
  #warn{
    background: $yellow-20;
    border-color:$yellow;
  }
  #success{
    background:$green-20;
    border-color:$green;
  }
  #error{
    background:$red-20;
    border-color:$red;
  }
</style>