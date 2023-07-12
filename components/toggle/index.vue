<template>
  <div class="input-wrapper" :id="props.on">
    <div class="text">
      {{ props.text }}
    </div>
    <div class="toggle-wrap">
      <div class="toggle"></div>
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
  grid-template-columns: 1fr $clamp-3;
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
  width:$clamp-3;
  border:1px solid $dark;
  display:inline-block;
  &:hover{
    background:white;
  }
}
.toggle{
  box-sizing:border-box;
  background:$dark;
  border:2px solid $light;
}
.input-wrapper#true .toggle{
  float:right;
}
.input-wrapper:hover{
  cursor:pointer;
  .toggle-wrap{
    border:1px solid $dark;
  }
  .toggle{
    background:$dark;
  }
}
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
}
</style>
