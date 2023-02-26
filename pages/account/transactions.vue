
<template>
  <main>
    <navbar :pageTitle="pagename" />
    <div class="page">
      <div class="section" v-if="transactions.length">
        <div class="block">
          <navbar-tabs />
          <table>
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
        <div class="block">
          <p style="font-size:70%;">
            <span class="pill"> <omoji emoji="→" /> deposit </span> 
            <span class="pill"> <omoji emoji="←" /> withdrawal  </span>
            <span class="pill"> <omoji emoji="↗" /> dividend  </span>
          </p>
        </div>
      </div>
      <div class="section" v-else>
        <navbar-tabs />
        <div class="block">
          <h3> Cant make money, if you dont invest money <omoji emoji="😉"/> </h3>
        </div>
        <div class="block">
          <cta />
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
  const pagename = 'Transactions';
  const title = 'Kalt — ' + pagename;
  definePageMeta({
    middleware: 'auth'
  })
  useHead({
    title,
    meta: [{
      name: 'description',
      content: "Make money, make a difference."
    }]
  })

  const supabase = useSupabaseClient()
  const {data: {user}} = await supabase.auth.getUser()

  const loading = ref(null)

  const { data: transactions } = await useLazyAsyncData('transactions', async () => {
    const {data, error} = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .eq('transaction_status', 3)
      .order('created_at', { ascending: false })
      .gte('amount', 1)
    if (data) oklog('success', 'got transactions for '+user.id)
    if (error) oklog('error', 'could not get transactions for '+user.id)
    return data
  })

  // https://www.arrowsymbol.com/
  const deposit = 0;
  const withdraw = 1;
  const dividend = 2;
  function getTransactionType(x){ 
    if (x===deposit) return "→"
    if (x===withdraw) return "←"
    if (x===dividend) return "↗"
  }
  function getTransactionTypeClass(x){ 
    if (x===deposit) return "deposit"
    if (x===withdraw) return "withdrawal"
    if (x===dividend) return "dividend"
  }
  function getTransactionStatusClass(x){ 
    if (x===0) return "green"
    if (x===1) return "red"
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
  border: .1px solid black;
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
/* https://developer.mozilla.org/en-US/docs/Web/CSS/cursor */
tr.deposit:hover{
  cursor: e-resize;
}
tr.withdrawal:hover{
  cursor: w-resize;
}
tr.dividend:hover{
  cursor: ne-resize;
}
</style>