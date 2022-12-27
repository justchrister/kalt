<template>
  <div class="frame">
    <div v-for="image in images" :key="image.value" 
      :class="'image '+style" 
      :style="'background-image:url('+image+');'"></div>
  </div>
</template>
<script>
  export default{ 
    props: ['images', 'style']
  } // inputId = forInput in label and id in input
</script>