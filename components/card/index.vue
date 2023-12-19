<template>
  <div class="card">
    <div :class="checkBrand(props.number)"></div>
    <div class="details">  {{ "•••• •••• •••• " + fourDigits }}  </div>
    <div :class="'default '+props.default"> <span> set </span> default  </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    number: {
      type: Number,
      required: true
    },
    default: {
      type: Boolean,
      required: true
    }
  })

  const checkBrand = (brand) => {
    if(brand){
      let firstDigit = brand.toString().slice(0,  1);
      if(firstDigit==='1') return "logo amex"
      if(firstDigit==='2') return "logo mastercard"
      if(firstDigit==='3') return "logo amex"
      if(firstDigit==='4') return "logo visa"
      if(firstDigit==='5') return "logo mastercard"
      if(firstDigit==='6') return "logo discover"
      if(firstDigit==='8') return 'logo jcb'
      if(firstDigit==='9') return 'logo unionpay'
      return "logo"
    }
  }
  const fourDigits = props.number.toString().slice(-4);
</script>
<style scoped lang="scss">
  .card{
    border:$border;
    border-radius:$border-radius;
    padding:sizer(1) 0 sizer(1) sizer(2);
    margin:sizer(1) 0;
    max-height:sizer(4);
    overflow:hidden;
  }
  .card:hover{
    background-color:white;
    cursor: pointer;
  }
  .card .logo{
    width:sizer(4);
    height:sizer(4);
    background: transparent;
    background-size: contain;
    display:inline-block;
    background-repeat: no-repeat;
    background-position: center center;
    box-sizing: border-box;
    vertical-align: top
  }

  .logo.visa{ 
    background-image: url('/media/icons/visa.svg');
  }
  .logo.mastercard{ 
    background-image: url('/media/icons/mastercard.svg');
  }
  .logo.amex{ 
    background-image: url('/media/icons/amex.svg');
  }
  .logo.discover{ 
    background-image: url('/media/icons/discover.svg');
  }
  .logo.dinersclub{ 
    background-image: url('/media/icons/dinersclub.png');
  }
  .logo.jcb{ 
    background-image: url('/media/icons/jcb.svg');
  }
  .logo.unionpay{ 
    background-image: url('/media/icons/unionpay.svg');
  }
  
  
  .card .details{
    width:clamp($unit-min*15, $unit*15, $unit-max*15);
    height:sizer(4);
    line-height:sizer(4);
    padding-left:sizer(2);
    display:inline-block;
    vertical-align: center;
  }
  .card .default{
    width:clamp($unit-min*8, $unit*8, $unit-max*8);
    height:sizer(4);
    line-height:sizer(4);
    display:block;
    float:right;
    padding-right:sizer(2);
    text-align:right;
  }
  .card .default.true span{
    display:none;
  }
  .card:hover .default.false{
    text-decoration:underline;
  }
  .add-card .year-group,
  .add-card .month-group{
    width:50%;
    display: inline-block;
  }

  .add-card .month-group select{
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  .add-card .year-group select{
    border-left-width:0px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
  .add-card .year-group select{
    border-left-width:0px;
  }
  .no-card{
    padding-left:0;
    text-align:center;
    text-decoration:none;
  }/*
  .dark-mode{
    .logo.visa{ 
      background-image: url('/media/icons/visa-light.svg');
    }
    .logo.mastercard{ 
      background-image: url('/media/icons/mastercard.svg');
    }
    .logo.amex{ 
      background-image: url('/media/icons/amex.svg');
    }
    .card{
      border-color:$light;
    }
    .card:hover{
      background-color:$dark;
  }
  }*/
</style>