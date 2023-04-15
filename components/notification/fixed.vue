<template>
  <div class="wrap">
    <div class="notify" :id="props.type">
      {{props.message}}
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
    background: rgba($blue, 0.2);
    width:$sitewidth;
    max-width: $maxsitewidth; 
    margin:auto;
    padding:$clamp-1-5 $clamp-2;
  }
  #warn{
    background: $yellow-20;
  }
  #success{
    background:$green-20;
  }
  #error{
    background:$red-20;
  }
</style>