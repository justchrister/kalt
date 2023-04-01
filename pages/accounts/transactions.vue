
<template>
  <main>
    <navbar-breadcrumbs parent="Accounts"/>
    <block margin="half" v-if="data">
      <div class="transactions-header">
        <div>Amount</div>
        <div></div>
        <div>Date</div>
        <div>Time</div>
      </div>
      <transaction 
        v-for="transaction of data" 
        :key="transaction.transaction_id" 
        :type="transaction.transaction_type"
        :amount="transaction.amount"
        :dateTime="transaction.modified_at"
        :currency="transaction.currency"
      />
    </block>
    <block v-if="data">
      <span class="pill"> <omoji emoji="→" /> deposit </span> 
      <span class="pill"> <omoji emoji="←" /> withdrawal  </span>
      <span class="pill"> <omoji emoji="↗" /> dividend  </span>
    </block>
    <block v-else>
      <h3> Cant make money, if you dont invest money <omoji emoji="😉"/> </h3>
    </block>
    <block margin="none">
      <cta />
    </block>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Transactions',
    middleware: 'auth'
  })
  useHead({
    title: 'Transactions',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const {data, error} = await supabase
    .from('transactions')
    .select()
    .eq('user_id', user.value.id)
    .eq('transaction_status', 3)
    .order('created_at', { ascending: false })
    .limit(10)
  

  if (data) ok.log('success', 'got transactions for '+user.value.id)
  if (error) ok.log('error', 'could not get transactions for '+user.value.id)

</script>
<style scoped lang="scss">
  .transactions-header {
    display: grid; 
    grid-template-columns: $clamp 12fr 2fr 2fr; 
    gap: 2% 2%; 
    border-bottom:$border;
    padding-top:$clamp-2;
  }
</style>