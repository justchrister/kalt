<template>
  <div :class="'columns col-'+number">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    n: {
      type: Number,
      required: true
    }
  })
  //convert to string
  const number = props.n.toString()
</script>
<style scoped lang="scss">
  .columns{
    display:grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: sizer(1);

    &.col-2{
      grid-template-columns: repeat(2, 1fr);
    }
    &.col-3{
      grid-template-columns: repeat(3, 1fr);
    }
    &.col-4{
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>