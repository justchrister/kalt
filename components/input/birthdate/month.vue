<template>
  <div>
    <label> Which month were you born?</label>
    <div class="wrap months">
      <div :class="['month', { 'selected': selected === 1 }]" @click="select(1)">  
        <span class="text">January</span>
      </div>
      <div :class="['month', { 'selected': selected === 2 }]" @click="select(2)">
        <span class="text">February</span>
      </div>
      <div :class="['month', { 'selected': selected === 3 }]" @click="select(3)">
        <span class="text">March</span>
      </div>
      <div :class="['month', { 'selected': selected === 4 }]" @click="select(4)">
        <span class="text">April</span>
      </div>
      <div :class="['month', { 'selected': selected === 5 }]" @click="select(5)">
        <span class="text">May</span>
      </div>
      <div :class="['month', { 'selected': selected === 6 }]" @click="select(6)">
        <span class="text">June</span>
      </div>
      <div :class="['month', { 'selected': selected === 7 }]" @click="select(7)">
        <span class="text">July</span>
      </div>
      <div :class="['month', { 'selected': selected === 8 }]" @click="select(8)">
        <span class="text">August</span>
      </div>
      <div :class="['month', { 'selected': selected === 9 }]" @click="select(9)">
        <span class="text">September</span>
      </div>
      <div :class="['month', { 'selected': selected === 10 }]" @click="select(10)">
        <span class="text">October</span>
      </div>
      <div :class="['month', { 'selected': selected === 11 }]" @click="select(11)">
        <span class="text">November</span>
      </div>
      <div :class="['month', { 'selected': selected === 12 }]" @click="select(12)">
        <span class="text">December</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    user: {
      type: Object,
      required: true
    }
  })
  const supabase = useSupabaseClient();
  const user = props.user;

  const selected = ref();
  if(user && user.birthdate){
    selected.value = ok.toInt(user.birthdate.split('-')[1]);
  }
  const select = async (month: number) => {
    selected.value = month;
    let monthAsString = month.toString();
    const userReInit = await get(supabase).user(user);
    if(monthAsString.length===1){
      monthAsString = '0' + monthAsString;
    }
    pub(supabase, { 
      sender: 'components/input/birthdate/month.vue',
      id: user.id 
    }).users({
      birthdate: `${userReInit.birthdate?.split('-')[0]}-${monthAsString}-${userReInit.birthdate?.split('-')[2]}`
    });
  }
</script>
<style scoped lang="scss">
  .months{
    display:grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: sizer(1);
    .month{
      padding:sizer(4) sizer(1.2) sizer(0.5) sizer(1.2);
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