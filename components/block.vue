<template>
  <div :class="classes">
    <label v-if="props.label" @click="expand()">{{props.label}} <span v-if="props.type == 'expand' && expanded">↑</span> <span v-if="props.type == 'expand' && !expanded"> ↓ </span></label> 
    <slot></slot>
    <background-video v-if="props.video" :mp4="props.video" />
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    margin: {
      type: String,
      required: false,
    },
    padding: {
      type: String,
      required: false,
    },
    border: {
      type: Boolean,
      required: false,
    },
    width: {
      type: String,
      required: false,
    },
    video: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
  });

  const classes = ref(['block']);
  if (props.width) {
    classes.value.push('width-' + props.width);
  }
  if (props.margin) {
    classes.value.push('margin-' + props.margin);
  }
  if (props.padding) {
    classes.value.push('padding-' + props.padding);
  }
  if (props.video) {
    classes.value.push('video');
  }
  if (props.border) {
    classes.value.push('border');
  }
  if (props.type) {
    classes.value.push(props.type);
  }
  
  let expanded = false;
  const expand = async () => {
    if (props.type == 'expand') {
      expanded = !expanded;
      if (expanded) {
        classes.value.push('expanded');
      } else {
        classes.value = classes.value.filter((item) => item !== 'expanded');
      }
    }
  };

  
</script>
<style scoped lang="scss">
  .block {
    width: $sitewidth;
    max-width: $maxsitewidth;
    margin:0 auto sizer(10) auto;
    box-sizing: border-box;
    position: relative;
    &.margin-half{
      margin-bottom: sizer(5);
    }
    @for $i from 1 through 20 {
      &.margin-#{$i} {
        margin-bottom: sizer($i);
      }
    }
    &.video{
      padding: sizer(10) sizer(5) sizer(5) sizer(5);
    }
    &.margin-0,
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
  }
  .block.expand{
    overflow:hidden;
    max-height:sizer(5);
    margin-bottom:sizer(2);
    label{
      font-size:sizer(1.5);
      line-height:sizer(5);
      &:hover{
        cursor:pointer;
      
      }
    }
    &.expanded{
      max-height:10000px;
    }
  }
  @media screen and (max-width: 838px) {
    .block.video{
      padding: sizer(10) sizer(2) sizer(3) sizer(2);
    }
  }
</style>