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
      <h1 class="add-top-padding"> Cant make money, if you dont invest money <omoji emoji="😉"/> </h1>
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
      .from('getAccountTransactions')
      .select()
      .eq('userId', user.value.id)
      .not('currency', 'is', null)
      .not('amount', 'is', null)
      .order('date', { ascending: false })
      .limit(props.limit || 200)
    if (data && data.length>0){
      ok.log('success', 'got transactions for '+user.value.id)
      return data
    } else {
      ok.log('error', 'could not get transactions for '+user.value.id)
      return null
    }
  }
  
  const transactions = await getTransactions()
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
  .add-top-padding{
    padding-top:$clamp-8;
  }
</style>