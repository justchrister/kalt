<template>
  <div :class="classes" >
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    color: {
      type: String,
      required: false
    },
    active: {
      type: Boolean,
      required: false
    },
    clickable: {
      type: Boolean,
      required: false
    }
  })
  const classes = computed(() => {
    let classes = ['pill']
    if (props.color) {
      classes.push(props.color)
    }
    if (props.active===true) {
      classes.push('active')
    }
    if (props.clickable===true) {
      classes.push('clickable')
    }
    return classes
  })
</script>
<style scoped lang="scss">
  .pill{
    display: inline-block;
    background-color: green(90%);
    border-radius:sizer(2);
    padding:0 sizer(1);
    font-size: 80%;
    line-height:sizer(2);
    &.clickable:hover{
      cursor: pointer;
    }
  }
  .blue{
    background-color: blue(40%);
    &.clickable:hover{
      background-color: blue(65%);
    }
    &.active{
      background-color: blue(60%);
    }
  }
</style>