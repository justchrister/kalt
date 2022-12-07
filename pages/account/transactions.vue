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

const { data: transactions, pending, error, refresh } = await useFetch('http://localhost:3000/api/transactions/getTransactions?user_id='+user.value.id)
</script>
<template>
  <div class="PageWrapper">
    <Kaltmenu :pageTitle="pagename" />
    <div class="page">
      <div class="section">
        <kaltheader />
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
</template>