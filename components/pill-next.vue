<template>
  <div :class="classes" @click="clickedOn()">
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
    },
    size: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: false
    }, 
    to: {
      type: String,
      required: false
    }
  })
  const classes = computed(() => {
    let classes = ['pill']
    if (props.color) {
      classes.push('color-'+props.color)
    }
    if (props.size) {
      classes.push(props.size)
    }
    if (props.type) {
      classes.push(props.type)
    }
    if (props.active===true) {
      classes.push('active')
    }
    if (props.clickable===true) {
      classes.push('clickable')
    }
    return classes
  })
  const clickedOn = () => {
    if(!props.to) return
    navigateTo(props.to)
  }
</script>
<style scoped lang="scss">

  .color-none{
    border: dark(50%) solid sizer(0.02);
  }
  .clickable:hover{
    cursor: pointer;
  }
  .pill{
    display: inline-block;
    border-radius:sizer(2);
    padding:0 sizer(1);
    font-size: 80%;
    box-sizing: border-box;
    line-height:sizer(2);
    &.small{
      font-size: 70%;
    }
    &.hoverable{
      @include hoverable;
      @include border;
      border-radius:sizer(2);
      &:hover{
        @include hovering;
      }
    }
  }
  .color-green{
    background-color: green(90%);
    border: green(90%) solid sizer(0.02);
  }
  .color-blue{
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
  .color-primary{
    background-color: primary(10%);
    border: dark(100%) solid sizer(0.02);
  }
</style>