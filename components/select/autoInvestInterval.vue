<template>
  <div :class="{'intervalSelector': true, 'selected': isSelected}" v-if="title" @click="updateAutoInvestInterval(props.type)">
    <div class="title"> {{title[props.type]}} </div>
    <div :class="{ 'monthDays': true, 'monthlyBeginning': true, 'selected': innerInterval === 'monthlyBeginning' }"
         v-if="type === 'monthly'" 
         @click.stop="updateAutoInvestInterval('monthlyBeginning')">
      1st
    </div>
    <div :class="{ 'monthDays': true, 'monthlyMiddle': true, 'selected': innerInterval === 'monthlyMiddle' }"
         v-if="type === 'monthly'" 
         @click.stop="updateAutoInvestInterval('monthlyMiddle')">
      15th
    </div>
    <div :class="{ 'monthDays': true, 'monthlyEnd': true, 'selected': innerInterval === 'monthlyEnd' }"
         v-if="type === 'monthly'" 
         @click.stop="updateAutoInvestInterval('monthlyEnd')">
      30th
    </div>
  </div>
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const userId = useSupabaseUser()
  const user = await get(supabase).user(userId.value.id)
  const props = defineProps({
    type: {
      type: String,
      required: true
    },
    selected:{
      type: String,
      required: true
    }
  })
  const innerInterval = ref();

  const updateAutoInvestInterval = async (selectedInterval: any) => {
    let interval = selectedInterval;
    if(selectedInterval === 'monthlyBeginning') {
      innerInterval.value = 'monthlyBeginning';
    } else if(selectedInterval === 'monthlyMiddle') {
      innerInterval.value = 'monthlyMiddle';
    } else if(selectedInterval === 'monthlyEnd') {
      innerInterval.value = 'monthlyEnd';
    }

    if(props.type==='monthly'){
      interval = innerInterval.value;
    }
    if(props.type==='monthly' && !innerInterval.value){
      innerInterval.value = 'monthlyMiddle';
      interval = innerInterval.value;
    }
    
    const error = await pub(supabase, {
      sender:'pages/invest/auto.vue',
      entity: user.userId
    }).autoInvest({
      userId: user.userId,
      interval: interval
    });
    if(error) {
      ok.log('error', error)
    } else {
      ok.log('success', 'autoInvestInterval was updated to: '+interval)
    }
  }
  const isSelected = ref(props.selected === props.type || false);
  const setSelectedValue = async () => {
    if(props.selected.startsWith('monthly') && props.type==='monthly') {
      isSelected.value = true;
      updateAutoInvestInterval(props.selected);
    }
  }
  await setSelectedValue();
  watch(() => props.selected, (newValue, oldValue) => {
    if(props.type==='monthly'){
      if(newValue === 'monthlyBeginning' || newValue === 'monthlyMiddle' || newValue === 'monthlyEnd'){
        isSelected.value = true;
        return;
      } else {
        isSelected.value = false;
      }
    } else if(props.selected.startsWith('monthly') && props.type==='monthly') {
      isSelected.value = newValue === props.type;
    } else {
      isSelected.value = newValue === props.type;
    }
  })
  const title = {
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly'
  } as any;
</script>
<style scoped lang="scss">
.intervalSelector{
  display: grid;
  grid-template-columns: 1fr sizer(4) sizer(4) sizer(4);
  width: 100%;
  height: sizer(6);
  box-sizing: border-box;
  margin-bottom: sizer(1);
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
  color: $dark;
  transform:translateY(0);
  &.beginning{
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
      background-color: $dark-80;
    }
  }
  &:after{
    display:block;
  }
}
.monthDays{
  font-size:75%;
  color: $dark-60;
  transform:translateY(sizer(0.5));
  text-align:center;
  &:after{
    display: none;
    content:'';
    width: sizer(0.5);
    height: sizer(0.5);
    border: $border;
    border-radius:100%;
    margin:auto;
  }
  &.selected{

    &:after{
      background: $dark;
    }
  }
  &.monthlyBeginning{
    transition: transform 150ms 20ms $easing-in;
  }
  &.monthlyMiddle{
    transition: transform 150ms 50ms $easing-in;
  }
  &.monthlyEnd{
    transition: transform 150ms 80ms $easing-in;
  }
}
</style>