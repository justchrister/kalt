<template>
  <section>
    <block margin="none">
      <h1>{{props.title}}</h1>
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
    }
  })
</script>
<style scoped lang="scss">
section{
  padding: sizer(9) 0 sizer(7) 0;
  margin-bottom: sizer(5);
  background:url('/images/gradient-2.jpg') no-repeat center center;
  background-size:cover;
  h1{
    color: dark(90%);
  }
  p{
    line-height:150%;
  }
}
</style>