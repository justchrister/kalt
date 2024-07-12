<template>
  <div :class="'block '+classes">
    <slot></slot>
    <video v-if="props.video" :src="props.video" class="background-video" autoplay muted loop></video>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    margin: {
      type: String,
      required: false
    },
    padding: {
      type: String,
      required: false
    },
    border: {
      type: Boolean,
      required: false
    },
    width:{
      type: String,
      required: false
    },
    video: {
      type: String,
      required: false
    }
  })
  const classes = ref('')
  if(props.width){ 
    classes.value += ' width-'+props.width;
  }
  if(props.margin){ 
    classes.value += ' margin-'+props.margin;
  }
  if(props.padding){ 
    classes.value += ' padding-'+props.padding;
  }
  if(props.video){ 
    classes.value += ' video';
  }
  if(props.border){ 
    classes.value += ' border';
  }
</script>
<style scoped lang="scss">
  .block {
    width: $sitewidth;
    max-width: $maxsitewidth;
    margin:0 auto sizer(10) auto;
    position: relative;
    &.margin-half{
      margin-bottom: sizer(5);
    }
    &.margin-double{
      margin-bottom: sizer(20);
    }
    &.margin-1{
      margin-bottom: sizer(1);
    }
    &.margin-2{
      margin-bottom: sizer(2);
    }
    &.margin-3{
      margin-bottom: sizer(3);
    }
    &.margin-4{
      margin-bottom: sizer(4);
    }
    &.video{
      padding-left: sizer(5);
      padding-top: sizer(15);
      padding-bottom: sizer(5);
    }
    &.margin-none{
      margin-bottom: 0;
    }
    &.width-small{
      max-width: sizer(35);
    }
    &.width-wide{
      max-width: $maxsitewidth*1.2; 
    }
    &.width-extra-wide{
      max-width: $maxsitewidth*1.5; 
    }
    &.border{
      padding: sizer(1.5) sizer(2);
      @include border;
    }
    
    .background-video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover; // Ensures the video covers the entire area
      border-radius: 15px; // Adjust the radius as needed
      z-index: -1; // Ensure the video is behind other content
    }
  }

  @media screen and (max-width: $maxsitewidth) {
    .block.video{
      padding-left: sizer(2);
      padding-top: sizer(10);
      padding-bottom: sizer(3);
    }
  }
</style>