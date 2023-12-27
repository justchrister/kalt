<template>
  <div class="image" :style="'background-image:url('+props.src+');'"></div>
</template>
<script setup lang="ts">
  const props = defineProps({
    src: {
      type: String,
      required: true
    }
  })
</script>
<style scoped lang="scss">
.image {
  width:100%;
  height: 32vw;
  max-height: 268px;
  display: inline-block;
  flex-grow: 1;
  flex-basis: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: $blue-20;
  border-radius: $border-radius;
}
.image:first-child {
  height: 50vw;
  max-height: 418px;
  margin-right: sizer(1);
}
.image:first-child:only-child{
  margin-right:0px;
}
</style>