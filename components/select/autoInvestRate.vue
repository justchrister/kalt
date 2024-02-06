<template>
  <div class="input-wrap">
    <modal title="Feature is not available" :show="markedAsUnavail">
      At the current moment 100% of all the dividends are reinvested. But we are planning on letting you get automatic payments directly to your account.
    </modal>
    <label>Select reinvestment ratio (%): </label>
    <div class="wrapper" @click="markedAsUnavail=true">
      <span>{{percent}}%</span>
      <span @click="remove()" class="button">-</span>
      <span @click="add()" class="button">+</span>
    </div>
  </div>
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const percent = ref(100)
  const user = await get(supabase).user(auth.value) as user;

  if(user) percent.value = user.autoVest*100

  const postUserPreference = async (autoVestRate) => {
    const autoVest = autoVestRate/100;
    const error = await pub(supabase, {
      sender:'components/select/autoVest.vue',
      id: user?.id
    }).users({
      autoVest: autoVest
    });
    if(error){
      ok.log('', 'error updating auto-invest: ', error)
    } else {
      ok.log('', 'updated auto-invest: '+autoVestRate)
    }
  }

  const add = async () => { 
    return 
    // added return so that we dont update it
    if(percent.value>=100){
      percent.value=100
    } else {
      percent.value+=10
    }
    postUserPreference(percent.value);
  }
  const remove = async () => {
    return
    // added return so that we dont update it
    if(percent.value<=0){
      percent.value=0
    } else {
      percent.value-=10
    }    
    postUserPreference(percent.value);
  }
  const markedAsUnavail = ref(false)
</script>
<style scoped lang="scss">
  label{
    display:block;
  }
  .wrapper{
    display:grid;
    grid-template-columns: 1fr sizer(5) sizer(5);
    user-select: none;
    @include border;
  }
  span{
    display:inline-block;
    border:none;
    border-left: $border;
    padding: sizer(1);
    min-width: sizer(4);
    box-sizing: border-box;
    user-select: none;
    height:100%;
    text-align:center;
    @include hoverable;
    &:first-child{
      background:transparent;
      border-left:none;
      width: sizer(7);
    }
    &.button:hover{
      @include hovering;
    }
  }
  .input-wrap{
    margin-top: sizer(1);
  }
</style>