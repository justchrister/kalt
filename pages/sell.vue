
<template>
  <main>
    <block v-if="max>0">
      <h1>Withdraw from account</h1>
      <p>Selling shares will directly effect your portfolio performance negatively and the positive impact on the environemnt.</p>
      <form @submit.prevent="publishSellOrder()">
        <input-amount-sell :uuid="uuid" :max="max" :portfolio="portfolioMax" :account="accountMax" :currency="user.currency"/>
        <account-linked-card />
        <button> sell <loading-icon v-if="loading" /> </button>
      </form>
    </block>
    <block v-else>
      <h1> You have nothing to withdraw <omoji emoji="🙃"/></h1>
      <h1> Let's change that <omoji emoji="✨"/> </h1>
      <button @click="navigateTo('/portfolio/buy')"> invest in something that matters </button>
    </block>
  </main>
</template>
<script lang="ts" setup>
  const loading = ref(false)
  definePageMeta({
    pagename: 'Divest',
    middleware: 'auth'
  })
  useHead({
    title: 'Divest'
  })
  const supabase = useSupabaseClient()
  const userId = useSupabaseUser() as any || '' as any
  const user = await get(supabase).user(userId.value.id) as any || '' as any;

  const uuid = ok.uuid();

  const getPortfolioMax = async () => {
    const portfolio = await get(supabase).portfolio(user) as any || [] as any;
    return Math.floor(portfolio[portfolio.length - 1].value)
  }
  const getAccountMax = async () => {
    const account = await get(supabase).accountBalance(user) as any || 0 as number;
    const accountInt = ok.toInt(account)
    return Math.floor(accountInt)
  }

  const portfolioMax = await getPortfolioMax();
  const accountMax = await getAccountMax();
  const max = portfolioMax + accountMax;
  ok.log('', max)
  const publishSellOrder = async () => {
    loading.value = true
    if(!max) return false;
    if(!userId.value) return false;
    const { error, data } = await pub(supabase, {
      sender: 'pages/sell.vue',
      entity: uuid
    }).accountTransaction({
      userId: userId.value.id,
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