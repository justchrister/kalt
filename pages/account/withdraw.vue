<template>
  <main>
    <div class='page'>
      <div class="block">
        Select the amount you want to invest: 
        <choose-amount-withdraw :uuid="transaction_id" />
        <label>Deposit money to: </label>
        <nuxt-link to="/account/manage-cards">
          <default-card />
        </nuxt-link>
        <button @click="completeTransaction"> sell </button>
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
        'user_id': user.value.id,
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

</script>