<template>
  <div class="card">
    <div :class="'logo ' + props.brand"></div>
    <div class="details">  •••• •••• •••• {{ props.lastFour }}  </div>
    <div class="default"> default </div>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    lastFour: {
      type: Number,
      required: true
    },
    brand: {
      type: String,
      required: true
    }
  })
</script>
<style scoped lang="scss">
  
  .card{
    padding: sizer(1) sizer(2);
    margin: 0 0 sizer(1) 0;
    max-height: sizer(4);
    max-width: 100%;
    display:grid;
    grid-template-columns: sizer(4) 1fr sizer(5);
    gap: sizer(2);
    overflow:hidden;
    @include border;
    @include hoverable;
  }
  .card:hover{
    @include hovering;
  }
  .card .logo{
    width: sizer(4);
    height: sizer(4);
    background: transparent;
    background-size: contain;
    display:inline-block;
    background-image: url('/images/brands/mastercard.svg');
    background-repeat: no-repeat;
    background-position: center center;
    box-sizing: border-box;
    vertical-align: top;
  }  
  .card .details{
    height: sizer(4);
    line-height: sizer(4);
  }  
  .card .default{
    height: sizer(4);
    line-height: sizer(4);
    float:right;
    text-align:right;
    font-size: sizer(1.2);
    color: dark(75%);
  }

  .logo.visa{ 
    background-image: url('/images/brands/visa.svg');
  }
  .logo.mastercard{ 
    background-image: url('/images/brands/mastercard.svg');
  }
  .logo.amex{ 
    background-image: url('/images/brands/amex.svg');
  }
  .logo.discover{ 
    background-image: url('/images/brands/discover.svg');
  }
  .logo.dinersclub{ 
    background-image: url('/images/brands/dinersclub.png');
  }
  .logo.jcb{ 
    background-image: url('/images/brands/jcb.svg');
  }
  .logo.unionpay{ 
    background-image: url('/images/brands/unionpay.svg');
  }
</style>