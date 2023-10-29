<template>
  <div class="intro">
    <block margin="none">
      <h1 class="sans-serif no-margin">{{props.title}}</h1>
    </block>
  </div>
</template>
<script setup>
  const props = defineProps({
    title: {
      type: String,
      required: true
    }
  })
</script>
<style scoped lang="scss">
.intro{
  padding:$clamp-9 0 $clamp-7 0;
  margin-bottom:$clamp-5;
  background:url('/gradient-2.jpg') no-repeat center center;
  background-size:cover;
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