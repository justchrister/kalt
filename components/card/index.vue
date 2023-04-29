<template>
  <div class="card">
    <div :class="checkBrand(props.number)"></div>
    <div class="details">  {{ "•••• •••• •••• " + props.number.toString().slice(-4) }}  </div>
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
  const checkBrand = (brand_id) => {
    let first_digit = brand_id.toString().slice(0,  1);
    if(first_digit==='2') return "logo mastercard"
    if(first_digit==='3') return "logo amex"
    if(first_digit==='5') return "logo mastercard"
    if(first_digit==='4') return "logo visa"
    if(first_digit==='6') return "logo"
    return "ehm what?"
  }

</script>
<style scoped lang="scss">
  .card{
    border:$border;
    border-radius:$border-radius;
    padding:$clamp 0 $clamp $clamp-2;
    margin:$clamp 0;
    max-height:$clamp-4;
    overflow:hidden;
  }
  .card:hover{
    background-color:#fff;
    cursor: pointer;
  }
  .card .logo{
    width:$clamp-4;
    height:$clamp-4;
    background: transparent;
    background-size: contain;
    display:inline-block;
    background-repeat: no-repeat;
    background-position: center left;
    box-sizing: border-box;
    vertical-align: top
  }

  .card .logo.visa{ 
    background-image: url('/media/icons/visa.svg');
  }
  .card .logo.mastercard{ 
    background-image: url('/media/icons/mastercard.svg');
  }
  .card .logo.amex{ 
    background-image: url('/media/icons/amex.svg');
  }
  .card .logo.plus{ 
    background-image: url('/omoji/plus.svg');
    background-size:40%;
  }

  .card .details{
    width:clamp($unit-min*15, $unit*15, $unit-max*15);
    height:$clamp-4;
    line-height:$clamp-4;
    padding-left:$clamp-2;
    display:inline-block;
    vertical-align: center;
  }
  .card .default{
    width:clamp($unit-min*8, $unit*8, $unit-max*8);
    height:$clamp-4;
    line-height:$clamp-4;
    display:block;
    float:right;
    padding-right:$clamp-2;
    text-align:right;
  }
  .card .default.true span{
    display:none;
  }
  .card:hover .default.false{
    text-decoration:underline;
  }
  .add-card .expiry_year-group,
  .add-card .expiry_month-group{
    width:50%;
    display: inline-block;
  }

  .add-card .expiry_month-group select{
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  .add-card .expiry_year-group select{
    border-left-width:0px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
  .add-card .expiry_year-group select{
    border-left-width:0px;
  }
  .no-card{
    padding-left:0;
    text-align:center;
    text-decoration:none;
  }
</style>