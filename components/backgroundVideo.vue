<template>
  <video v-if="props.mp4" autoplay muted autoPlay loop playsinline ref="vid">
    <source :src="posterFileName" type="image/jpg">
    <source :src="'videos/output/'+mp4" type="video/mp4" v-if="mp4">
    <source :src="'videos/output/'+ogg" type="video/ogg" v-if="ogg">
    <source :src="'videos/output/'+webm" type="video/webm" v-if="webm">
  </video>
</template>
<script setup lang="ts">
  const props = defineProps({
    mp4: {
      type: String,
      required: true
    }
  })

  const vid = ref();

  const mbPs = 1.5;

  const posterFileName = props.mp4.replace('.mp4', '.jpg');
  const mp4Hq = props.mp4;
  const mp4Min = props.mp4.replace('.mp4', '-min.mp4');
  const webmHq = props.mp4.replace('.mp4', '.webm');
  const webmMin = props.mp4.replace('.mp4', '-min.webm');
  const oggHq = props.mp4.replace('.mp4', '.ogg');
  const oggMin = props.mp4.replace('.mp4', '-min.ogg');


  const webm = ref("");
  const mp4 = ref("");
  const ogg = ref("");
  const determineNetworkSpeed = () => {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      return connection.downlink;
    }
    return null;
  }
  
  const loadVideos = () => {
    const speed = determineNetworkSpeed();
    if (speed && speed < mbPs) {
      mp4.value = mp4Min;
      webm.value = webmMin;
      ogg.value = oggMin;
    } else {
      mp4.value = mp4Hq;
      webm.value = webmHq;
      ogg.value = oggHq;
    }
  }

  onMounted(() => {
    loadVideos();
  });
  const nuxtApp = useNuxtApp();

  nuxtApp.hook("page:finish", () => {
    if(props.mp4 && vid.value){
      setTimeout(() => {
        vid.value.play();
      }, 200);
      console.log('played video')
    }
  });
</script>
<style scoped lang="scss">    
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; // Ensures the video covers the entire area
    border-radius: 15px; // Adjust the radius as needed
    z-index: -1; // Ensure the video is behind other content
  }
</style>