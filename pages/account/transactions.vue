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
function getTransactionTypeClass(x){ 
  if (x===0) return "deposit" // deposit
  if (x===1) return "withdrawal" // withdraw
  if (x===2) return "dividend" // dividend
  if (x===3) return "auto-invest" // auto-invest
}
function getTransactionStatusClass(x){ 
  if (x===0) return "green" // deposit
  if (x===1) return "red" // withdraw
}

function addZero(i) {
  if (i < 10) {i = "0" + i}
  return i;
}
console.log(transactions)
</script>
<template>
  <div class="PageWrapper">
    <navbar :pageTitle="pagename" />
    <div class="page">
      <div class="section">
        <tabs />
        <div class="block">
          <table>
            <tr>
              <th></th>
              <th>Amount</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
            <tr v-for="transaction of transactions" :key="transaction.transaction_id" :class="getTransactionTypeClass(transaction.transaction_type)">
              <td>{{ getTransactionType(transaction.transaction_type) }}</td>
              <td>{{ transaction.amount }} {{ transaction.currency }}</td>
              <td>
                {{new Date(transaction.created_at).getDate()}}/{{new Date(transaction.created_at).getMonth()+1}}/{{new Date(transaction.created_at).getFullYear()}} 
              </td>
              <td>
                {{addZero(new Date(transaction.created_at).getHours()) }}:{{addZero(new Date(transaction.created_at).getMinutes())}}
              </td>
            </tr>
          </table>
        </div>
        <!-- make these ones filters at a later point -->
        <div class="block">
          <p style="font-size:70%;">
            <span> → deposit </span> 
            <span> ← withdrawal  </span>
            <span> ↗ dividend  </span>
            <span> ↻ auto-invested </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.green{ color:green; }
.red{ color:red; }
tr td:first-child{ text-align:center;}
span{
  margin-right:5px;
  padding:5px 10px;
  border: 1px solid black; 
  border-radius: 3px;
}
</style>