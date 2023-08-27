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
      {{ok.toPercent(autoInvest)}}
    </div>
    <div>
      Preferred currency
    </div>
    <div class="right">
      {{currency}}
    </div>
  </div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const getAccountBalance = async () => {
    const { data, error } = await supabase
      .from('getAccountBalance')
      .select()
      .eq('userId', user.value.id)
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
  const getCurrency = async () => {
    const { data, error } = await supabase
      .from('getUser')
      .select()
      .limit(1)
      .single()
    if(error){
      return 'EUR' 
    } else {
      return data.currency
    }
  }
  const getAutoInvest = async () => {
    const { data, error } = await supabase
      .from('getUser')
      .select()
      .limit(1)
      .single()
    if(error){
      return 1 
    } else {
      return data.autoInvest
    }
  }
  const currency = await getCurrency()
  const accountBalance = await getAccountBalance()
  const autoInvest = await getAutoInvest()
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