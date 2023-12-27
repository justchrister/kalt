
<template>
  <main>
    <block v-if="max>0">
      <h1>Withdraw from account</h1>
      <form @submit.prevent="completeWithdrawTransaction()">
        <input-amount-sell :uuid="uuid" :max="max" :portfolio="portfolioMax" :account="accountMax" :currency="user.currency"/>
        <account-linked-card />
        <input-button>sell <loading-icon v-if="loading" /></input-button>
      </form>
    </block>
    <block v-else>
      <h1> You have nothing to withdraw <omoji emoji="🙃"/></h1>
      <h1> Let's change that <omoji emoji="✨"/> </h1>
      <input-button link="/invest">invest in something that matters</input-button>
    </block>
    <span v-if="notification" @click="setNotification(null)">
      <banner-notification color="yellow" :message="notification"/>
    </span>
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
  const auth = useSupabaseUser() as any || '' as any
  const user = await get(supabase).user(auth) as user;

  const uuid = ok.uuid();
  const notification = ref();

  const getPortfolioMax = async () => {
    const portfolio = await get(supabase).portfolio(user) as any || [] as any;
    return Math.floor(portfolio[portfolio.length - 1].value)
  }
  const getAccountMax = async () => {
    const account = await get(supabase).accountBalance(user) as any || 0 as number;
    return ok.toFloat(account)
  }

  const setNotification = async (message) => {
    ok.log('error', message)
    notification.value=message
    loading.value=false
    return
  }
  
  const portfolioMax = await getPortfolioMax();
  const accountMax = await getAccountMax();
  const max = portfolioMax + accountMax;
  ok.log('', max)
  const completeWithdrawTransaction = async () => {
    if(!max) return false;
    if(!userId.value) return false;
    loading.value = true
    const currentWithdrawTransaction = await sub(supabase, 'accountTransactions').entity(uuid);
    if(Math.abs(currentWithdrawTransaction.amount)>max){
      setNotification ('Withdrawal amount exceeds max available')
      loading.value = false;
      return false;
    }
    const error = await pub(supabase, {
      sender: 'pages/accounts/withdraw.vue',
      entity: uuid
    }).accountTransactions({
      userId: user?.id, 
      status: 'pending',
      autoVest: 1
    });
    if(error){
      ok.log('error', 'could not create withdraw transaction: ', error.message)
      setNotification ('Could not create withdraw transaction: '+error.message)
      loading.value = false
    } else {
      ok.log('success', 'Withdraw transaction created')
      loading.value = false;
    };
  }

</script>
<style scoped lang="scss">
  button{
    margin-top: sizer(1);
  }
</style>