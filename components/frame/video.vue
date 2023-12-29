

<template>
  <video autoplay muted loop playsinline>
    <source :src="src" type="video/mp4">
    Your browser does not support the video tag.
  </video>
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
video {
  width:100%;
  height: 32vw;
  max-height: 268px;
  flex-grow: 1;
  flex-basis: 0;
  display: inline-block;
  border-radius: $border-radius;
}
</style>