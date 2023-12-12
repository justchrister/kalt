<template>
  <div class="intervalSelector" v-if="title">
    <div class="title"> {{title}} </div>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    type: {
      type: String,
      required: true
    }
  })
  const selectTitle = (type) => {
    if(type==='daily') return 'Daily';
    if(type==='weekly') return 'Weekly';
    if(type==='biweekly') return 'Bi-weekly';
    if(type==='monthly') return 'Monthly';
    return 'Unknown'
  }
  const title = selectTitle(props.type);
</script>
<style scoped lang="scss">
.intervalSelector{
  display: block;
  width: 100%;
  height: $clamp-6;
  border: $border;
  border-color:$dark-40;
  box-sizing: border-box;
  margin-bottom:$clamp-1;
  padding: $clamp-1 $clamp-1-5;
  background-color:$test-color-1;
  border-radius:2px;
  transition: border-color 0.2s ease-in-out;
}
.intervalSelector:hover{
  background-color:$test-color-2;
  border-color:$dark-60;

  transition: border-color 0.2s ease-in-out;
}
  
</style>