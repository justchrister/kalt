<template>
  <section :class="props.ticker">
    <h1>{{ props.text }}</h1>
  </section>
</template>
<script setup lang="ts">
  const props = defineProps({
    text: {
      type: String,
      required: true
    },
    ticker: {
      type: String,
      required: false
    }
  })
</script>
<style scoped lang="scss">
  section{
    background-color: $light;
    padding: sizer(1.5) sizer(2);
    border: $border;
    &:before{
      content:'';
      display:block;
      width: sizer(60);
      height: sizer(70);
      top:0;
      transform:translateX(-66%);
      position:absolute;
      z-index:-1;
    }
  }
  h1{
    font-size: sizer(2.5);
    margin:0;
    padding:0;
  }

</style>