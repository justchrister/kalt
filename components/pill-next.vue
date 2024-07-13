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
    border: green(90%) solid sizer(0.02);
    border-radius:sizer(2);
    padding:0 sizer(1);
    font-size: 80%;
    box-sizing: border-box;
    line-height:sizer(2);
    &.clickable:hover{
      cursor: pointer;
    }
  }
  .blue{
    background-color: blue(40%);
    border: blue(40%) solid sizer(0.02);
    &.clickable:hover{
      background-color: blue(45%);
      border: blue(55%) solid sizer(0.02);
    }
    &.active{
      border: blue(100%) solid sizer(0.02);
    }
  }
  .primary{
    background-color: primary(10%);
    border: dark(100%) solid sizer(0.02);
  }
</style>