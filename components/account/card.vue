<template>
  <div class="card">
    <div>
      Balance
    </div>
    <div class="right">
      {{accountBalance}}
    </div>
    <div>
      Auto invest
    </div>
    <div class="right">
      {{ok.toPercent(user.autoInvest)}}
    </div>
    <div>
      Preferred currency
    </div>
    <div class="right">
      {{user.currency}}
    </div>
  </div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const userId = useSupabaseUser()
  const user = await get(supabase).user(userId.value.id)
  const getAccountBalance = async (userId, currency) => {
    const { data, error } = await supabase
      .from('getAccountBalance')
      .select()
      .eq('userId', userId)
      .limit(1)
      .single()
    if(error || !data.amount){
      ok.log('error', 'could not get account balance', error)
      return "0 €"
    } else {
      ok.log('success', 'got account balance: '+data.amount+' '+data.currency)
      return ok.formatCurrency(data.amount, data.currency)
    }
  }
  const accountBalance = await getAccountBalance(user.currency)
</script>
<style scoped lang="scss">
  .card{
    box-sizing: border-box;
    border:$border;
    padding: $clamp-1 $clamp-2;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .bold{
    font-weight: bold;
  }
  .right{
    text-align: right;
  }
  a{
    color:$blue;
  }
  /*
  .dark-mode .card{
    border-color:$light;
  }
  */
</style>