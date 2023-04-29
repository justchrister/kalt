<template>
  <div class="blkkk">
    <label>Amount to auto-invest: </label>
    <div class="wrapper">
      <span>{{val}}%</span>
      <span @click="remove()">-</span>
      <span @click="add()">+</span>
    </div>
  </div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const val = ref(1)

  const postUserPreference = async () => {
    const autoInvest = val.value/100;
    ok.log('autoInvest', autoInvest)
    const { data, error } = await supabase
        .from('user_preferences')
        .insert({
          'user_id': user.value.id,
          'message_sender': 'components/select/autoInvest.vue',
          'auto_invest': autoInvest
        })
        .eq('user_id', user.value.id)
      if(error) ok.log('error', 'could not update auto-invest', error)
  }


  const { data, error } = await supabase
    .from('get_user')
    .select('auto_invest')
    .eq('user_id', user.value.id)
    .limit(1)
    .single()
    

  if(data) val.value = data.auto_invest*100
  const add = async () => { 
    if(val.value>=100){
      val.value=100
    } else {
      val.value+=10
      await postUserPreference();
    }
  }
  const remove = async () => {
    if(val.value<=0){
      val.value=0
    } else {
      val.value-=10
      await postUserPreference();
    }
  }
</script>
<style scoped lang="scss">
label{
  display:block;
}
  .wrapper{
    display:inline-block;
    border:$border;   
  user-select: none;
  }
  span{
    display:inline-block;
    border:none;
    border-left:$border;
    padding:$clamp-0-5 0;
    min-width:$clamp-4;   
    user-select: none;
    text-align:center;
    &:hover{
      cursor: pointer;
      background:white;
    }
    &:first-child{
      background:transparent;
      border-left:none;
      width:$clamp-7;
    }
  }
  button:hover,
  button:active,
  button:focus{
    border-radius:0;
  }
  .blkkk{
    margin-top:$clamp;
  }
</style>