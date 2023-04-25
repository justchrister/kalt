<template>
  <div>
    <label>Amount to auto-invest: </label>
    <div class="wrapper">
      <span>{{val}}%</span>
      <span @click="remove()">-</span>
      <span @click="add()">+</span>
    </div>
  </div>
</template>
<script setup lang="ts">
const val = ref(0)
const add = () => { 
  if(val.value>=100) val.value=100
  else val.value+=10
  
}
const remove = () => {
  if(val.value<=0) val.value=0
  else val.value-=10 
}
</script>
<style scoped lang="scss">
label{
  display:block;
}
  .wrapper{
    display:inline-block;
    border:$border;   
  user-select: none;
  }
  span{
    display:inline-block;
    border:none;
    border-left:$border;
    padding:$clamp-0-5 0;
    min-width:$clamp-4;   
  user-select: none;
    text-align:center;
    &:hover{
      cursor: pointer;
      background:white;
    }
    &:first-child{
      background:transparent;
      border-left:none;
      width:$clamp-7;
    }
  }
  button:hover,
  button:active,
  button:focus{
    border-radius:0;
  }
</style>