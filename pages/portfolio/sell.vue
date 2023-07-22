
<template>
  <main>
    <block>
      <h3>Sell shares</h3>
      <p>Selling shares will directly effect your portfolio performance negatively and the positive impact on the environemnt.</p>
      <form @submit.prevent="publishSellOrder()">
        <input-amount-sell :uuid="uuid"/>
        <button> sell <loading-icon v-if="loading" /> </button>
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

  const getMax = async () => {
    const { data, error } = await supabase
      .from('get_user_portfolio')
      .select('quantity_today')
      .order('date', { ascending: false })
      .limit(1)
      .single()
    return data.quantity_today
  }

  const publishSellOrder = async () => {
    loading.value = true
    const hasShares = await getMax();
    if(!hasShares) return false;
    const { data, error } = await supabase
      .from('exchange_orders')
      .insert({
          message_entity_id: uuid,
          message_sender: 'pages/portfolio/sell.vue',
          user_id: user.value.id,
          order_status: 'open'
      })
    if(error){
      ok.log('error', 'could not create exchange order: ', error)
      loading.value = false
    } else {
      ok.log('success', 'exchange order created: ')
      loading.value = false;
    };
  }

</script>
<style scoped lang="scss">
  button{
    margin-top:$clamp;
  }
</style>