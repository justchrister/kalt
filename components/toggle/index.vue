<template>
  <div class="input-wrapper" :id="isOn" @click="toggle()">
    <div class="toggle-wrap">
      <div class="toggle"></div>
    </div>
    <div class="text">
      {{props.text}}
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

const isOn=ref(props.on)
const toggle = async () => {
  if (isOn.value){
    isOn.value=false
    return
  }
  if(!isOn.value){
    isOn.value=true
    return
  }
}
</script>
<style scoped lang="scss">
$clamp:clamp($unit-min*1.8, $unit*1.8, $unit-max*1.8);
.input-wrapper {
  display: grid; 
  grid-template-columns: clamp($unit-min*3, $unit*3, $unit-max*3) 1fr; 
  gap: 2% clamp(calc($unit-min/2), calc($unit/2), calc($unit-max/2)); 
}
.toggle-wrap,
.toggle{
  width:$clamp;
  height:$clamp;
  border-radius:$clamp;
}
.text{
  height:$clamp;
  display:inline-block;
}
.toggle-wrap{
  width:clamp($unit-min*3, $unit*3, $unit-max*3);
  border:1px solid $blue-80;
  display:inline-block;
}
.toggle{
  box-sizing:border-box;
  background:$blue-80;
  border:2px solid $light;
}
.input-wrapper#false .toggle{
  float:right;
}
.input-wrapper:hover{
  cursor:pointer;
  .toggle-wrap{
    border:1px solid $blue;
  }
  .toggle{
    background:$blue;
  }
}
</style>
