<template>
  <div class="card">
    <div class="bold transfer">
      Deposit transfer details
    </div>
    <div>
    </div>
    <div>
      Name
    </div>
    <div class="right">
      Kalt LLC
    </div>
    <div>
      E-mail
    </div>
    <div class="right">
      transfers@ka.lt
    </div>
    <div>
      IBAN
    </div>
    <div class="right">
      EN83 7044 0600 0338 1770
    </div>
    <div>
      Bank code (SWIFT)
    </div>
    <div class="right">
      KLTT2XXXX
    </div>
    <div>
      Reference
    </div>
    <div class="right">
      {{user.email}}
    </div>
  </div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const getAccountBalance = async () => {
    const { data, error } = await supabase
      .from('get_account_balance')
      .select()
      .limit(1)
      .single()
    return ok.formatCurrency(data.amount, data.currency)
  }
  const getCurrency = async () => {
    const { data, error } = await supabase
      .from('get_user')
      .select()
      .limit(1)
      .single()
    return data.currency
  }
  const getAutoInvest = async () => {
    const { data, error } = await supabase
      .from('get_user')
      .select()
      .limit(1)
      .single()
    return data.auto_invest
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