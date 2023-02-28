
<template>
  <main>
    <div class='page'>
      <div class="section" id="about">
        <div class="block">
          Select the amount you want to invest: 
          <select-amount :uuid="transaction_id" />
          <label>Deposit money to: </label>
          <nuxt-link to="/account/manage-cards">
            <default-card />
          </nuxt-link>
          <button @click="completeTransaction"> sell </button>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
  const pagename = 'Buy';
  const title = 'Kalt — ' + pagename;
  const router = useRouter()
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()


  const { data: incomplete_order_exists, error } = await supabase
    .from('transactions')
    .select()
    .eq('transaction_status',0)

  useHead({
    title,
    meta: [{
      name: "description",
      content: "Make money, make a difference."
    }]
  });
  definePageMeta({
    layout: "focused",
  });


  const { data: transaction_id } = await useLazyAsyncData('cards', async () => {
    const { data, error } = await supabase
      .from('transactions')
      .insert({
        'user_id': user.id,
        'transaction_type': 1
      })
      .select('transaction_id')
      .single()
    if (!incomplete_order_exists) return data.transaction_id
    if ( incomplete_order_exists) return incomplete_order_exists[0].transaction_id
  })

  const completeTransaction = async () => {
    const { error } = await supabase
      .from('transactions')
      .update({
        transaction_id: transaction_id.value,
        transaction_status: 1
      })
    router.go(-1)
  }
  console.log("we have to:")
  console.log("1. create a select-shares component")
  console.log("2. verify that the customer has the needed shares in their portfolio")
  console.log("3. create a sell order")

</script>