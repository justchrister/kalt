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
    width:$clamp-10;
    text-align:center;
    display:inline-block;
  }
  .logo{
    background-position: center;
    background-size:contain;
    background-repeat:no-repeat;
    height:$clamp-6;
    width:$clamp-6;
    margin:0 $clamp-2;
  }
  #tillit .logo{
    background-image:url('/ventures/tillit.svg');
  }
  #empress .logo{
    background-image:url('/ventures/empress.png');
  }
  .name{
    font-size:$clamp-1;
  }
</style>