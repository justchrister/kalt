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
  padding:$clamp-9 0 $clamp-7 0;
  margin-bottom:$clamp-5;
  &.gradient-2{
    background:url('/gradient-2.jpg') no-repeat center center;
    background-size:cover;
  }
  &.gradient-3{
    background:url('/gradient-3.jpg') no-repeat center center;
    background-size:cover;
  }
  &.gradient-4{
    background:url('/gradient-4.jpg') no-repeat center center;
    background-size:cover;
  }
  h1{
    margin:0;
    color:$dark-90;
  }
  p{
    line-height:1.5;
    padding-top:$clamp-1-5;
  }
}
</style>