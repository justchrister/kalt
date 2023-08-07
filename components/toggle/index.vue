<template>
  <div class="input-wrapper">
    <div class="text">
      {{ props.text }}
    </div>
    <div class="toggle-wrap" :id="props.on">
      <span id="off"> off </span>
      <span id="on"> on </span>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  on: {
    type: Boolean,
    required: false
  },
})
</script>
<style scoped lang="scss">
$clamp:clamp($unit-min*1.8, $unit*1.8, $unit-max*1.8);
.input-wrapper {
  display: grid; 
  grid-template-columns: 1fr $clamp-12;
  gap: 2% clamp(calc($unit-min/2), calc($unit/2), calc($unit-max/2));
}
.text{
  height:$clamp;
  display:inline-block;
}
.toggle-wrap{
  text-align:right;
  span{
    margin-left:$clamp-2;
    border:$border;
    padding:0 $clamp-0-5;
    &#on:hover,
    &#off:hover{
      cursor:pointer;
      background:white;
      border: $border;
      border-color:$dark;
    }
  }
  #on{ border-color:transparent; }
  #off{ border-color:$dark; }
  &#true{
    #on{ border-color:$dark; }
    #off{ border-color:transparent; }
  }
}/*
.dark-mode{
  .input-wrapper:hover{
    .toggle-wrap{
      border:1px solid $light;
      background:black;
    }
    .toggle{
      background:$light;
    }
  }
  .toggle{
    background:$light;
    border-color:$dark;
  }
  .toggle-wrap{
    border-color:$light;
  }
}*/
</style>
