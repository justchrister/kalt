<template>
  <section>
    <block margin="none">
      <h1 class="sans-serif no-margin">{{props.title}}</h1>
      <p v-if="props.paragraph">
        {{ props.paragraph  }}
      </p>
    </block>
  </section>
</template>
<script setup lang="ts">
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    paragraph:{
      type: String,
      required: false
    },
    gradient: {
      type: Boolean,
      required: false
    }
  })
</script>
<style scoped lang="scss">
section{
  padding: sizer(9) 0 sizer(7) 0;
  margin-bottom: sizer(5);
  background:url('/gradient.jpg') no-repeat center center;
  background-size:cover;
  h1{
    margin:0;
    color: dark(90%);
  }
  p{
    line-height:1.5;
    padding-top: sizer(1.5);
  }
}
</style>