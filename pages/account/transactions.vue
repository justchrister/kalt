<script setup lang="ts">
    const pagename = 'Transactions';
    const title = 'Kalt — ' + pagename;
    const description = ref('My App Description')

    useHead({
      title,
      meta: [{
        name: 'description',
        content: description
      }]
    })
/*
definePageMeta({
  middleware: ['auth']
})
*/
const client = useSupabaseClient()
const user = useSupabaseUser()
const loading = ref(null)

onMounted(() => {
  watchEffect(() => {
    if (!user.value) {
      navigateTo('/authenticate/sign-in')
    }
  })
})
/*
const { data: transactions } = await useAsyncData('transactions', async () => {
  const { data } = await client.from('transactions').select('transaction_id, transaction_type, currency, amount, created_at').eq('user_id', user.value.id).order('created_at')

  return data
})
*/
const { pending, data: transactions } = useLazyFetch('/api/transactions/getTransactions')
watch(transactions, (newTransactions) => {
  // Because posts starts out null, you will not have access
  // to its contents immediately, but you can watch it.
})

</script>
<template>
  <div class="PageWrapper">
    <Kaltmenu :pageTitle="pagename" />
    <div class="page">
      <div class="section">
        <kaltheader />
        <div v-if="transactions?.length > 0">
          <table>
            <tr>
            <th>Amount</th>
            <th>Account</th>
            <th>Date</th>
            </tr>
            <tr v-for="transaction of transactions" :key="transaction.transaction_id">
            <td>{{ transaction.amount }} {{ transaction.currency }}</td>
            <td>{{ transaction.transaction_type }}</td>
            <td>{{ transaction.created_at }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>