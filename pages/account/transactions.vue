
<template>
  <main>
    
    <div class="page">
      <navbar-tabs />
      <div class="block" v-if="data">
        <navbar-tabs />
        <div class="transaction">
          <div></div>
          <div>Amount</div>
          <div>Date</div>
          <div>Time</div>
        </div>
        <transaction 
          v-for="transaction of data" 
          :key="transaction.transaction_id" 
          :type="transaction.transaction_type"
          :amount="transaction.amount"
          :dateTime="transaction.modified_at"
          :currency="transaction.currency"
        />
      </div>
      <div class="block" v-if="data">
        <span class="pill"> <omoji emoji="→" /> deposit </span> 
        <span class="pill"> <omoji emoji="←" /> withdrawal  </span>
        <span class="pill"> <omoji emoji="↗" /> dividend  </span>
      </div>
      <div class="block" v-else>
        <h3> Cant make money, if you dont invest money <omoji emoji="😉"/> </h3>
      </div>
      <div class="block">
        <cta />
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
  const user = useSupabaseUser()

  const {data, error} = await supabase
    .from('transactions')
    .select()
    .eq('user_id', user.value.id)
    .eq('transaction_status', 3)
    .order('created_at', { ascending: false })
  console.log(data)
  if (data) oklog('success', 'got transactions for '+user.value.id)
  if (error) oklog('error', 'could not get transactions for '+user.value.id)

</script>