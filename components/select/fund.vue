<template>
  <section>
    <div class="icon"></div>
    <div> Your fund </div>
    <div class="link"> 
      <nuxt-link to="/funds/your">
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
    padding: sizer(1.5) sizer(2) sizer(1.5) sizer(1);
    max-height: sizer(3);
    overflow:hidden;
    display:grid;
    grid-template-columns: sizer(3) 1fr sizer(6);
    line-height:sizer(2);
  }
  .icon{
    height:sizer(2);
    width:sizer(2);
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
