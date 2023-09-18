<template>
  <section>
    <div class="icon"></div>
    <div> Your fund </div>
    <div class="link"> 
      <nuxt-link to="funds/your">
        adjust
      </nuxt-link>
    </div>
  </section>
</template>
<script setup lang="ts">
</script>
<style scoped lang="scss">
  section{
    border: $border;
    padding: $clamp-1-5 $clamp-2 $clamp-1-5 $clamp-1;
    max-height: $clamp-3;
    overflow:hidden;
    display:grid;
    grid-template-columns: $clamp-3 1fr $clamp-6;
    line-height:$clamp-2;
  }
  .icon{
    height:$clamp-2;
    width:$clamp-2;
    display:block; 
    background-repeat: no-repeat;
    background-position: center;
    background-size:contain;
    background-image: url('/media/icons/funds/your.svg');
  }
  .link{
    color:$blue;
    text-align:right;

  }
  
</style>