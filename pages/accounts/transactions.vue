
<template>
  <main>
    <navbar-breadcrumbs parent="Accounts" />

    <block margin="none" v-if="transactions">
      <transaction v-for="transaction of transactions" :key="transaction.id" :type="transaction.type"
        :amount="transaction.amount" :currency="transaction.currency" :date="transaction.timestamp" />
    </block>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Transactions',
    middleware: 'auth'
  })
  
  useSeoMeta({
    title: 'Transactions',
    ogTitle: 'Transactions',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta.png'
  })
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;

  const transactions = await get(supabase).transactions(user);
</script>