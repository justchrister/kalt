<script setup lang="ts">

definePageMeta({
  middleware: ['auth']
})

const client = useSupabaseClient()
const user = useSupabaseUser()
const loading = ref(null)

onMounted(() => {
  watchEffect(() => {
    if (!user.value) {
      navigateTo('/authenticate')
    }
  })
})

const { data: transactions } = await useAsyncData('transactions', async () => {
  const { data } = await client.from('transactions').select('id, currency, amount, type,completed, initiated').order('initiated')
  return data
})
console.log(transactions.value)

</script>
<template>
  <div class="PageWrapper">
    <Kaltmenu pageTitle="Invest" />
    <div class="page">
      <div class="section">
        <div class="block">
          <h2 class="title">
            Here's your transactions :)
          </h2>
          <div v-if="transactions?.length > 0">
            <table>
              <tr>
                <th>Amount</th>
                <th>Account</th>
                <th>Date</th>
              </tr>
              <tr
                v-for="transaction of transactions"
                :key="transaction.id"
                class="${transaction.type}">

                <td>{{ transaction.amount }} {{ transaction.currency }}</td>
                <td>{{ transaction.type }}</td>
                <td>{{ transaction.completed }}</td>
              </tr>
            </table>
          </div>
        </div>
        <Cta />
      </div>
    </div>
  </div>
</template>