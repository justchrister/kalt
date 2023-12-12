<template>
  <div class="intro">
    <block margin="none">
      <h1 class="sans-serif no-margin">{{props.title}}</h1>
      <p v-if="props.paragraph">{{props.paragraph}}</p>
    </block>
    <navbar-tabs />
  </div>
</template>
<script setup>
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    paragraph: {
      type: String,
      required: false
    },
    color: {
      type: String,
      required: false
    },

  })
</script>
<style scoped lang="scss">
.intro{
  padding:$clamp-9 0 $clamp-7 0;
  margin-bottom:$clamp-5;
  background-image:url('/gradient-2-min.jpg');
  background-size:cover;
  background-repeat:no-repeat;
  h1{
    margin:0;
  }
  p{
    line-height:1.5;
    padding-top:$clamp-1-5;
  }
}
</style>