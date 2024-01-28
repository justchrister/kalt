<template>
  <div :id="props.id">
    <div class="logo"></div>
    <div class="name">{{ props.id }}</div>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    id: {
      type: String,
      required: true
    }
  })
</script>
<style scoped lang="scss">
  div{
    width: sizer(10);
    text-align:center;
    display:inline-block;
  }
  .logo{
    background-position: center;
    background-size:contain;
    background-repeat:no-repeat;
    height: sizer(6);
    width: sizer(6);
    margin:0 sizer(2);
  }
  #tillit .logo{
    background-image:url('/ventures/tillit.svg');
  }
  #empress .logo{
    background-image:url('/ventures/empress.png');
  }
  .name{
    font-size: sizer(1);
  }
</style>