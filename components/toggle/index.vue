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
<script setup lang="ts">
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
.input-wrapper {
  display: grid; 
  grid-template-columns: 1fr sizer(12);
}
.text{
  height: sizer(1);
  display:inline-block;
}
.toggle-wrap{
  display: grid; 
  grid-template-columns: 1fr 1fr;
  grid-gap:0;
  &:hover{
    cursor:pointer;
  }
  span{
    margin:0;
    width: sizer(5);
    text-align:center;
    border: $border;
  }
  #on{ border-color:transparent; }
  #off{ border-color: $dark; }
  &#true{
    #on{ border-color: $dark; }
    #off{ border-color:transparent; }
  }
}
</style>
