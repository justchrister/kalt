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
      margin-bottom: sizer(5);
    }
    &.margin-double{
      margin-bottom: sizer(20);
    }
    &.margin-3{
      margin-bottom: sizer(3);
    }
    &.margin-2{
      margin-bottom: sizer(2);
    }
    &.margin-none{
      margin-bottom: 0;
    }
    &.width-small{
      max-width: sizer(35);
    }
    
  }
</style>