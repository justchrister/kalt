
<template>
  <main>
    <block>
      <h1>Let's invest!  <omoji emoji="☀️" /></h1>
      <form @submit.prevent="completeTransaction">
        <input-amount-buy :uuid="uuid"/>
        <card-default />
        <button> invest <loading-icon v-if="loading" /> </button>
      </form>
    </block>
  </main>
</template>
<script setup>
  const loading = ref(false)
  definePageMeta({
    pagename: 'Invest',
    layout: 'focused',
    middleware: ['default', 'auth']
  })
  useHead({
    title: 'Invest'
  })
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const uuid = ok.uuid();

  const completeTransaction = async () => {
    loading.value = true
    const { data, error } = await supabase
      .from('account_transactions')
      .insert({
          message_entity_id: uuid,
          message_sender: 'pages/portfolio/buy.vue',
          user_id: user.value.id,
          transaction_sub_type: 'card',
          transaction_status: 'payment_awaiting',
          auto_invest: 1
      })
    if(error){
      ok.log('error', 'could not create transaction', error)
      loading.value = false
    } else {
      ok.log('success', 'transaction created')
      navigateTo('/portfolio/success')
      loading.value = false;
    };
  }

</script>