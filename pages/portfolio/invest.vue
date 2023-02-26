
<template>
  <main>
    <div class='page'>
      <div class="section" id="about">
        <div class="block">
          <h3>Let's invest!  <omoji emoji="☀️" /></h3>
          <select-amount :uuid="transaction_id" v-if="transaction_id"/>
          <br/>
          <label>Choose card to charge: </label>
          <nuxt-link to="/account/manage-cards">
            <default-card />
          </nuxt-link>
          <br/>
          <button @click="completeTransaction"> buy </button>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
  const pagename = 'Invest';
  const title = 'Kalt — ' + pagename;
  const description = ref('My App Description')
  const router = useRouter()
  const supabase = useSupabaseClient()
  const {data: {user}} = await supabase.auth.getUser()
  // checking if an incomplete order exists
  const { data: incomplete_order_exists, error } = await supabase
    .from('transactions')
    .select()
    .eq('transaction_status',0)
    .single()

  if(incomplete_order_exists) oklog('success', 'found incomplete transaction: '+incomplete_order_exists.transaction_id)
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
    layout: "focused",
  });


  const { data: transaction_id } = await useLazyAsyncData('cards', async () => {
    // if there is not an incomplete transaction, start new transaction
    if (!incomplete_order_exists) {
      const { data, error } = await supabase
        .from('transactions')
        .insert({
          'user_id': user.id,
          'transaction_type': 0
        })
        .select('transaction_id')
        .single()
      
      if(error) oklog('error', 'could not create new transaction id')
      if(!error) oklog('success', 'started new transaction: '+data.transaction_id)
      return data.transaction_id
    }
    // if there is an incomplete order, return old id
    oklog('success', 'setting transaction_id to incomplete transaction_id: '+incomplete_order_exists.transaction_id)
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
      oklog('error', 'could not complete transaction: '+transaction_id.value)
    }
    if(!error) {
      oklog('success', 'completed transaction: '+transaction_id.value)
      router.go(-1)
    }
  }

</script>