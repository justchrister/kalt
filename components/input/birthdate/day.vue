<template>
  <div class="wrap days">
    <div v-for="day in 31" :key="day" :class="['day', { 'selected': selected === day }]" @click="select(day)">
      <span class="text">{{ day }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    user: {
      type: Object,
      required: false
    }
  })
  const supabase = useSupabaseClient()
  const user = props.user;
  const selected = ref(0);
  if(user && user.birthdate){
    selected.value = ok.toInt(user.birthdate.split('-')[2]);
  }
  const select = async (day: number) => {
    selected.value = day;
    let dayAsString = day.toString();
    const userReInit = await get(supabase).user(user);
    if(dayAsString.length===1){
      dayAsString = '0' + dayAsString;
    }
    pub(supabase, { 
      sender: 'components/input/birthdate/month.vue',
      id: user.id 
    }).users({
      birthdate: `${userReInit.birthdate?.split('-')[0]}-${userReInit.birthdate?.split('-')[1]}-${dayAsString}`
    });
  }
</script>
<style scoped lang="scss">
  .days{
    display:grid; 
    grid-template-columns: repeat(7, 1fr);
    gap: sizer(1);
    .day{
      padding:sizer(1) sizer(1) sizer(0.5) sizer(1.2);
      font-size:sizer(1.2);
      text-align:left;
      @include border;
      @include hoverable;
      .text{
        display:inline-block;
        transition: margin 0.1s $easing-in-out;
        margin-top: sizer(0.2);
      }
      &:hover{
        .text{
          transition: margin 0.1s $easing-in-out;
          margin-top: sizer(0);
        }
        @include hovering;
      }
      &.selected{
        .text{
          margin-top: sizer(0);
        }
        @include selected;
      }
    }
  }
</style>