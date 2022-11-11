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
  const { data } = await client.from('transactions').select('id, currency, amount, type').order('initiated')
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
            Hello {{ user?.email }}
          </h2>
            <div v-if="transactions?.length > 0">
              <ul>
                <li
                  v-for="transaction of transactions"
                  :key="transaction.id"
                  class="${transaction.type}"
                >
                  {{ transaction.type }} {{ transaction.amount }} {{ transaction.currency }}
                </li>
              </ul>
            </div>
        </div>
        <Cta />
      </div>
    </div>
  </div>
</template>