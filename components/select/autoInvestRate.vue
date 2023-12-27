<template>
  <div class="input-wrap">
    <label>Select reinvestment ratio (%): </label>
    <div class="wrapper">
      <span>{{percent}}%</span>
      <span @click="remove()">-</span>
      <span @click="add()">+</span>
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
      entity: user?.id
    }).users({
      userId: user?.id,
      autoVest: autoVest
    });
    if(error){
      ok.log('', 'error updating auto-invest: ', error)
    } else {
      ok.log('', 'updated auto-invest: '+autoVestRate)
    }
  }

  const add = async () => { 
    if(percent.value>=100){
      percent.value=100
    } else {
      percent.value+=10
    }
    postUserPreference(percent.value);
  }
  const remove = async () => {
    if(percent.value<=0){
      percent.value=0
    } else {
      percent.value-=10
    }    
    postUserPreference(percent.value);
  }
</script>
<style scoped lang="scss">
  label{
    display:block;
  }
  .wrapper{
    display:grid;
    grid-template-columns: 1fr sizer(5) sizer(5);
    border: $border;   
    user-select: none;
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
    &:hover{
      cursor: pointer;
      background:white;
    }
    &:first-child{
      background:transparent;
      border-left:none;
      width: sizer(7);
    }
  }
  button:hover,
  button:active,
  button:focus{
    border-radius:0;
  }
  .input-wrap{
    margin-top: sizer(1);
  }

/*
  .dark-mode span{
    border-color: $light;
    &:hover{
      background: $dark;
    }
  }
  .dark-mode .wrapper{
    border-color: $light;
  }*/
</style>