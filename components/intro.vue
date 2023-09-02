<template>
  <div class="intro">
    <block margin="none">
      <h1 class="sans-serif no-margin">{{props.title}}</h1>
      <p v-if="props.paragraph">{{props.paragraph}}</p>
    </block>
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
  padding:$clamp-7 0 $clamp-7 0;
  margin-bottom:$clamp-5;
  background:url('/gradientIntro.svg') no-repeat center center;
  background-size:cover;
  h1{
    margin:0;
  }
}
</style>