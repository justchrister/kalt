
<template>
  <main>
    <block>
      <h3>Let's invest!  <omoji emoji="☀️" /></h3>
      <input-amount-invest :uuid="transaction_id" v-if="transaction_id"/>
      <br/>
      <label>Choose card to charge: </label>
      <nuxt-link to="/profile/cards">
        <default-card />
      </nuxt-link>
      <br/>
      <button @click="completeTransaction"> buy </button>
    </block>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Invest',
    layout: 'focused',
    middleware: 'auth'
  })
  useHead({
    title: 'Invest',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })
  const router = useRouter()
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  // checking if an incomplete order exists
  const { data: incomplete_order_exists, error } = await supabase
    .from('transactions')
    .select()
    .eq('transaction_status',0)
    .single()

  if(incomplete_order_exists) ok.log('success', 'found incomplete transaction: '+incomplete_order_exists.transaction_id)

  const { data: transaction_id } = await useLazyAsyncData('cards', async () => {
    // if there is not an incomplete transaction, start new transaction
    if (!incomplete_order_exists) {
      const { data, error } = await supabase
        .from('transactions')
        .insert({
          'user_id': user.value.id,
          'transaction_type': 0
        })
        .select('transaction_id')
        .single()
      
      if(error) ok.log('error', 'could not create new transaction id')
      if(!error) ok.log('success', 'started new transaction: '+data.transaction_id)
      return data.transaction_id
    }
    // if there is an incomplete order, return old id
    ok.log('success', 'setting transaction_id to incomplete transaction_id: '+incomplete_order_exists.transaction_id)
    return incomplete_order_exists.transaction_id
  })

  const completeTransaction = async () => {
    const { error } = await supabase
      .from('transactions')
      .update({
        transaction_id: transaction_id.value,
        transaction_status: 1
      })
    if (error) {
      // add error handling
      ok.log('error', 'could not complete transaction: '+transaction_id.value)
    }
    if(!error) {
      ok.log('success', 'completed transaction: '+transaction_id.value)
      navigateTo('/portfolio')
    }
  }

</script>