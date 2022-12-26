<template>
  <div class="PageWrapper">
    <navbar :pageTitle="pagename" />
    <div class="page">
      <div class="section">
        <tabs />
        <div class="block">
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const pagename = 'Notifications';
  const title = 'Kalt — ' + pagename;
  const description = ref('My App Description')

  useHead({
    title,
    meta: [
      {
        name: "description",
        content: description,
      },
    ],
  });
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

const { data: transactions } = await useAsyncData('transactions', async () => {
  const { data } = await client.from('transactions').select('id, currency, amount, type,completed, initiated').order('initiated')
  return data
})

</script>