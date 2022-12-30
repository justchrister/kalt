
<template>
  <div class="PageWrapper">
    <navbar :pageTitle="pagename" />
    <div class="page">
      <div class="section">
        <div class="block">
          <tabs />
          <table   v-if="transactions" >
            <tr>
              <th id="type"></th>
              <th id="amount">Amount</th>
              <th id="date">Date</th>
              <th id="time">Time</th>
            </tr>
            <tr v-for="transaction of transactions" :key="transaction.transaction_id" :class="getTransactionTypeClass(transaction.transaction_type)">
              <td> <omoji :emoji="getTransactionType(transaction.transaction_type)" /></td>
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
        <div class="block"  v-if="transactions" >
          <p style="font-size:70%;">
            <span class="pill"> <omoji emoji="→" /> deposit </span> 
            <span class="pill"> <omoji emoji="←" /> withdrawal  </span>
            <span class="pill"> <omoji emoji="↗" /> dividend  </span>
            <span class="pill"> <omoji emoji="↻" /> auto-invested </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
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


    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    definePageMeta({
      middleware: ['auth']
    })

    onMounted(() => {
      watchEffect(() => {
        if (!user.value) {
          navigateTo('/auth')
        }
        if (!transactions[0]) {
          navigateTo('about/how-it-works')
        }
      })
    })

const loading = ref(null)

const {data: transactions, error} = await supabase.from('transactions').select('*').eq('user_id', user.value.id)
  .order('created_at', { ascending: false })

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
</script>
<style scoped>
.green{ color:green; }
.red{ color:red; }
span.pill{
  margin-right:5px;
  padding:5px 10px;
  border: 1px solid black; 
  border-radius: 3px;
}
#type{
  text-align:center;
  width:4%;
}
#date{
  width:15%;
}
#time{
  width:8%;
}
</style>