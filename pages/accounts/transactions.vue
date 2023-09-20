
<template>
  <main>
    <navbar-breadcrumbs parent="Accounts"/>

    <block margin="none" v-if="transactions">
      <transaction 
        v-for="transaction of transactions" 
        :key="transaction.message_entity" 
        :type="transaction.type"
        :amount="transaction.amount"
        :currency="transaction.currency"
        :date="transaction.message_sent"
      />
    </block>
  </main>
</template>
<script setup>
  definePageMeta({
    pagename: 'Transactions',
    middleware: 'auth'
  })
  useHead({
    title: 'Transactions'
  })
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  
  const transactions = await get(supabase).accountTransactions(user.value.id);
  ok.log('', transactions)
</script>