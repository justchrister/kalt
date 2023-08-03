
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
<script lang="ts" setup>
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

  const getMax = async () => {
    const { data, error } = await supabase
      .from('getUserPortfolio')
      .select('quantityToday')
      .order('date', { ascending: false })
      .limit(1)
      .single()
    if(error){
      return null
    } else {
      return data.quantityToday
    }
  }

  const publishSellOrder = async () => {
    loading.value = true
    const hasShares = await getMax();
    if(!hasShares) return false;
    if(!user.value) return false;
    const { error, data } = await pub(supabase, {
      sender: 'pages/portfolio/sell.vue',
      entity: uuid
    }).accountTransaction({
      userId: user.value.id,
      status: 'open'
    } as accountTransaction);
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