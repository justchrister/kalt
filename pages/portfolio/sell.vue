
<template>
  <main>
    <block>
      <h3>Sell shares</h3>
      <p>Selling shares will directly effect your portfolio performance negatively and the positive impact on the environemnt.</p>
      <form @submit.prevent="completeTransaction">
        <input-amount-sell :uuid="uuid"/>
        <!--<account-card />-->
        <button> sell <loading-icon v-if="loading" /> </button>
      </form>
    </block>
  </main>
</template>
<script setup lang="ts">
  const loading = ref(false)
  definePageMeta({
    pagename: 'Invest',
    layout: 'focused',
    middleware: 'auth'
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
      loading.value = false;
    };
  }

</script>