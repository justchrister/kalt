<template>
  <div class="image-wrap">
    <div class="image" :style="{'background-image': 'url(' + props.url + ')'}">
      <img :src="props.url" alt="">
      <slot></slot>
    </div>
    <span></span>
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
    display: grid;  // Changed to flex
    grid-template-columns: 1fr sizer(20);
    position:relative;
    min-height: sizer(6);
  }
  .image{
    display:inline-block;
    border: $border;
    background-size:cover;
    border-color: $dark-20;
    border-radius: sizer(0.5);
    width: auto;
    max-width: sizer(40);
    margin: sizer(1) 0;
    margin-right: auto;  // Pushes to the right
    padding: sizer(1);
  }

  img{
    max-width:100%;
    opacity:0;
  }
</style>