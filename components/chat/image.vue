<template>
  <div class="image-wrap">
    <div class="image" :style="{'background-image': 'url(' + props.url + ')'}">
      <img :src="props.url" alt="">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
    url: {
      type: String,
      required: true
    }
  })

</script>
<style scoped lang="scss">
  .image-wrap{
    display: flex;  // Changed to flex
    justify-content: flex-start;  // Pushes the child to the right
    position:relative;
    width: $clamp-40;
    min-height:$clamp-6;
    margin-right: $clamp-20;
  }
  .image{
    display:inline-block;
    border: $border;
    background-size:cover;
    border-color: $dark-20;
    border-radius: $clamp-0-5;
    width: auto;
    max-width: $clamp-40;
    margin: $clamp-1 0;
    margin-right: auto;  // Pushes to the right
    padding: $clamp-1;
  }
  img{
    max-width:100%;
    opacity:0;
  }
</style>