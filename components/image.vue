<template>
  <div class="frame">
    <div v-for="image in images" :key="v.value" 
      :class="'image '+type" 
      :style="'background-image:url('+image+');'"></div>
  </div>
</template>
<script>
  export default{ 
    props: ['images', 'type']
  } // inputId = forInput in label and id in input
</script>