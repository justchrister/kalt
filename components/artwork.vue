<template>
  <div class="wrapper">
    <div class="image" :style="`background-image: url('${props.image}')`"></div>
    <p>
      {{ props.title }} by {{ props.artist }}
    </p>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    artist: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  })
</script>
<style scoped lang="scss">
.wrapper{
  margin:sizer(2) 0 sizer(10) 0;
}
.image{
  width:100%;
  height:sizer(35);
  background-size:contain;
  background-position:center;
  
  background-repeat: no-repeat;

}
  p{padding-top:sizer(2);
    text-align:center;
  }
</style>