<template>
  <div>
    <block margin="none" v-if="transactions">
      <transaction 
        v-for="transaction of transactions" 
        :key="transaction.time" 
        :type="transaction.type"
        :amount="transaction.amount"
        :currency="transaction.currency"
        :date="transaction.date"
      />
    </block>
    <block v-else>
      <h3> Cant make money, if you dont invest money <omoji emoji="😉"/> </h3>
    </block>
    <block margin="none">
      <cta />
    </block>
    </div>
</template>
<script setup>
const props = defineProps({
    limit: {
      type: Number,
      required: false 
    }
  })

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const getTransactions = async () => {
    const {data, error} = await supabase
      .from('get_account_transactions')
      .select()
      .eq('userId', user.value.id)
      .not('currency', 'is', null)
      .not('amount', 'is', null)
      .order('date', { ascending: false })
      .limit(props.limit || 200)
    if (data){
      ok.log('success', 'got transactions for '+user.value.id)
      return data
    } 
    if (error){
      ok.log('error', 'could not get transactions for '+user.value.id)
      return null
    }
  }
  
  const transactions = await getTransactions()
  const getExchangeRates = async () => {
    
  }
</script>
<style scoped lang="scss">
  
  .transactions-header {
    display: grid; 
    grid-template-columns: $clamp 12fr 2fr 2fr; 
    gap: 2% 2%; 
    border-bottom:$border;
    padding-top:$clamp-2;
  }/*
  .dark-mode .transactions-header{
    border-color:$light;
  }*/
</style>