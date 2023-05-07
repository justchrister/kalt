

<template>
  <video autoplay muted loop>
    <source :src="src" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</template>
<script setup>
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
  height: 50vw;
  max-height: 418px;
  border:auto;
  display: block;
  border-radius:$clamp;
}
</style>