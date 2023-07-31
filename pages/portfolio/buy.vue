
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
    const { error, data } = await pub(supabase, {
      sender: 'pages/portfolio/buy.vue',
      entity: uuid
    }).accountTransaction({
      userId: user.value.id,
      type: 'deposit',
      subType: 'card',
      transactionStatus: 'payment_awaiting',
      autoInvest: 1
    });
    if(error){
      ok.log('error', 'could not create transaction', error)
      loading.value = false
    } else {
      ok.log('success', 'transaction created')
      loading.value = false;
      navigateTo('/portfolio/success')
    };
  }

</script>