<template>
  <ul>
    <li class="dark">
      
    </li>
    <li class="light">
      
    </li>
    <li class="crazy">
      
    </li>
  </ul>
</template>
<script setup lang="ts">
</script>
<style scoped lang="scss">
  ul{
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap:$clamp;
  }
  li{
    border:$border;
    display:block;
    height:$clamp-7;
    background-size: cover;
    background-position: center top;
    background-repeat: no-repeat;
  }
  .dark{
    background-image: url('/darkmode.svg');
  }
  .light{
    background-image: url('/lightmode.svg');
  }
  .crazy{
    background-image: url('/FsoMtuBXsAI_Bx7.jpeg');
    background-position: center;
  }
</style>