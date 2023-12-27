<template>
  <div class="intro">
    <block margin="half">
      <h1 class="sans-serif no-margin">{{props.title}}</h1>
      <p v-if="props.paragraph">{{props.paragraph}}</p>
    </block>
    <navbar-tabs />
  </div>
</template>
<script setup lang="ts">
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
  padding: sizer(9) 0 sizer(3) 0;
  margin-bottom: sizer(5);
  background-image:url('/gradient-2-min.jpg');
  background-size:cover;
  background-repeat:no-repeat;
  h1{
    margin:0;
  }
  p{
    line-height:1.5;
    padding-top: sizer(1.5);
  }
}
</style>