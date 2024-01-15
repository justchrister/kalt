<template>
  <section @click="navigateTo('/funds/your')">
    <div class="icon"></div>
    <div> Your fund </div>
    <div class="link"> 
      customize
    </div>
  </section>
</template>
<script setup lang="ts">
</script>
<style scoped lang="scss">
  section{
    padding: sizer(1.5) sizer(2) sizer(1.5) sizer(1);
    max-height: sizer(3);
    overflow:hidden;
    display:grid;
    grid-template-columns: sizer(3) 1fr sizer(10);
    line-height: sizer(2);
    @include border;
    @include hoverable;
  }
  section:hover{
    @include hovering;
    .link{
      color:$dark;
    }
  }
  .icon{
    height: sizer(2);
    width: sizer(2);
    display:block; 
    background-repeat: no-repeat;
    background-position: center;
    background-size:contain;
    background-image: url('/media/icons/funds/your.svg');
  }
  .link{
    text-align:right;
    font-size:75%;
    color: $dark-60;
    :after{
      display:inline;
      content:'->';
    }
  }
  
</style>
