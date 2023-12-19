<template>
  <section :class="'gradient-'+props.gradient">
    <block margin="none">
      <h1 class="sans-serif no-margin">{{props.title}}</h1>
    </block>
  </section>
</template>
<script setup>
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    gradient: {
      type: String,
      required: false
    }
  })
</script>
<style scoped lang="scss">
section{
  padding:sizer(9) 0 sizer(7) 0;
  margin-bottom:sizer(5);
  &.gradient-2{
    background:url('/gradient-2-min.jpg') no-repeat center center;
    background-size:cover;
  }
  &.gradient-3{
    background:url('/gradient-3-min.jpg') no-repeat center center;
    background-size:cover;
  }
  &.gradient-4{
    background:url('/gradient-4-min.jpg') no-repeat center center;
    background-size:cover;
  }
  h1{
    margin:0;
    color:$dark-90;
  }
  p{
    line-height:1.5;
    padding-top:sizer(1.5);
  }
}
</style>