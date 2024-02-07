<template>
  <div class="bar" :style="'background: linear-gradient(90deg, #a2ecd4 '+props.percentage+', #f3fbf5 '+props.percentage+');'"></div>
</template>
<script setup lang="ts">
  const props = defineProps({
    percentage: {
      type: String,
      required: true
    }
  })
  ok.log('', props.percentage)
</script>
<style scoped lang="scss">
  
  .bar{
    border-radius:$border-radius;
    color:green(10%);
    width:100%;
    height: sizer(1);
    display:block;
  }
</style>