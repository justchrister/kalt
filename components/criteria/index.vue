<template>
  <div>
    <span>0{{ props.nr }}</span>
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    nr: {
      type: Number,
      required: true
    }
  })
</script>
<style scoped lang="scss">
div{
  display:grid;
  grid-template-columns: sizer(3.5) 1fr;
}
  span{
    width:sizer(3);
    display:inline-block;
  }
</style>