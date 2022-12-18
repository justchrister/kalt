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

definePageMeta({
  middleware: ['auth']
})

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

const { data: transactions, pending, error, refresh } = await useFetch('/api/transactions/getTransactions',{
    query: { user_id: user.value.id },
    server: false
})

// https://www.arrowsymbol.com/
function getTransactionType(x){ 
  if (x===0) return "→" // deposit
  if (x===1) return "←" // withdraw
  if (x===2) return "↗" // dividend
  if (x===3) return "↻" // auto-invest
}
console.log(transactions)
</script>
<template>
  <div class="PageWrapper">
    <Kaltmenu :pageTitle="pagename" />
    <div class="page">
      <div class="section">
        <kaltheader />
          <table>
            <tr>
              <th></th>
              <th>Amount</th>
              <th>Account</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
            <tr v-for="transaction of transactions" :key="transaction.transaction_id">
              <td>{{ getTransactionType(transaction.transaction_type) }}</td>
              <td>{{ transaction.amount }} {{ transaction.currency }}</td>
              <td>{{ transaction.transaction_type }}</td>
              <td>
                {{ new Date(transaction.created_at).getDate() }} / 
                {{ new Date(transaction.created_at).getMonth()+1 }} / 
                {{ new Date(transaction.created_at).getFullYear() }} 
              </td>
              <td>
                {{ new Date(transaction.created_at).getHours() }}:{{new Date(transaction.created_at).getMinutes() }}
              </td>
            </tr>
          </table>
      </div>
    </div>
  </div>
</template>