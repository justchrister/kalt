<template>
  <div :class="{'intervalSelector': true, 'selected': props.selected}" v-if="title">
    <div class="title"> {{title}} </div>
    <div :class="{'monthDays start': true, 'selected': startOfMonth}" v-if="type==='monthly'" @click="setInnerInterval('start')">
      1st
    </div>
    <div :class="{'monthDays middle': true, 'selected': middleOfMonth}"  v-if="type==='monthly'" @click="setInnerInterval('middle')">
      15th
    </div>
    <div :class="{'monthDays end': true, 'selected': endOfMonth}" v-if="type==='monthly'" @click="setInnerInterval('end')">
      30th
    </div>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    type: {
      type: String,
      required: true
    },
    selected:{
      type: Boolean,
      required: false,
      default: false
    }
  })
  const selectTitle = (type: any) => {
    if(type==='daily') return 'Daily';
    if(type==='weekly') return 'Weekly';
    if(type==='biweekly') return 'Bi-weekly';
    if(type==='monthly') return 'Monthly';
    return 'Unknown'
  }
  const startOfMonth = ref(false);
  const middleOfMonth = ref(false);
  const endOfMonth = ref(true);
  const title = selectTitle(props.type);
  const setInnerInterval = async (innerInterval: any) => {
    if(innerInterval==='start'){
      startOfMonth.value = true;
      middleOfMonth.value = false;
      endOfMonth.value = false;
    } else if (innerInterval==='middle'){
      startOfMonth.value = false;
      middleOfMonth.value = true;
      endOfMonth.value = false;
    } else if (innerInterval==='end'){
      startOfMonth.value = false;
      middleOfMonth.value = false;
      endOfMonth.value = true;
    }
  }
</script>
<style scoped lang="scss">
.intervalSelector{
  display: grid;
  grid-template-columns: 1fr sizer(4) sizer(4) sizer(4);
  width: 100%;
  height: sizer(6);
  box-sizing: border-box;
  margin-bottom:sizer(1);
  padding: sizer(1) sizer(1.5);
  @include border;
}

.intervalSelector:hover{
  @include hovering;
}
.intervalSelector.selected{
  @include selected;
}
.intervalSelector.selected .monthDays{
  color:$dark;
  transform:translateY(0);
  &.start{
    transition: transform 150ms 80ms $easing-in;
  }
  &.middle{
    transition: transform 150ms 50ms $easing-in;
  }
  &.end{
    transition: transform 150ms 20ms $easing-in;
  }
  &:hover{
    &:after{
      background-color:$dark-80;
    }
  }
  &:after{
    display:block;
  }
}
.monthDays{
  font-size:75%;
  color:$dark-60;
  transform:translateY(sizer(0.5));
  text-align:center;
  &:after{
    display: none;
    content:'';
    width: sizer(0.5);
    height: sizer(0.5);
    border:$border;
    border-radius:100%;
    margin:auto;
  }
  &.selected{

    &:after{
      background:$dark;
    }
  }
  &.start{
    transition: transform 150ms 20ms $easing-in;
  }
  &.middle{
    transition: transform 150ms 50ms $easing-in;
  }
  &.end{
    transition: transform 150ms 80ms $easing-in;
  }
}
</style>