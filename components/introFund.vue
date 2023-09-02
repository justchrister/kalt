<template>
  <section>
    <h1>{{ props.text }}</h1>
  </section>
</template>
<script setup lang="ts">
  const props = defineProps({
    text: {
      type: String,
      required: true
    }
  })
</script>
<style scoped lang="scss">
  section{
    background-color:$light;
    padding: $clamp-1-5 $clamp-2;
    border:$border;
    &:before{
      content:'';
      display:block;
      width:$clamp-40;
      height:$clamp-60;
      top:0;
      transform:translateX(-55%);
      position:absolute;
      z-index:-1;
      background:$red;
    }
  }
  h1{
    font-size: $clamp-2-5;
    margin:0;
    padding:0;
  }

</style>