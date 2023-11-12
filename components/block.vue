<template>
  <div class="block" :class="classes">
    <slot></slot>
  </div>
</template>
<script setup>
  const props = defineProps({
    margin: {
      type: String,
      required: false
    },
    width: {
      type: String,
      required: false
    }
  })
  const classes = ref('')
  if(props.margin){ 
    classes.value += ' margin-'+props.margin;
  }
  if(props.width){ 
    classes.value += ' width-'+props.width;
  }
</script>
<style scoped lang="scss">
  .block {
    width: $sitewidth;
    max-width: $maxsitewidth;
    margin:0 auto clamp($unit-min*10, $unit*10, $unit-max*10) auto;

    &.margin-half{
      margin-bottom: $clamp-5;
    }
    &.margin-double{
      margin-bottom: $clamp-20;
    }
    &.margin-1{
      margin-bottom: $clamp-1;
    }
    &.margin-2{
      margin-bottom: $clamp-2;
    }
    &.margin-3{
      margin-bottom: $clamp-3;
    }
    &.margin-4{
      margin-bottom: $clamp-4;
    }
    &.margin-none{
      margin-bottom: 0;
    }
    &.width-small{
      max-width: $clamp-35;
    }

    &.width-wide{
      max-width:$maxsitewidth*1.2; 
    }
    
  }
</style>