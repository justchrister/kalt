
<template>
  <main>
    <navbar-tabs />
    <block margin="1">
      <info-box type="success" text="With automatic investment set to 100% and automatic transfers to Kalt, you can set up a low-cost alternative to subscriptions ✨" />
    </block>
    <block margin="1">
      <input-amount-subscription :amount="subscription.amount || 0"/>
    </block>
    <block margin="2">
      <label>Select which days you want to auto-invest</label>
      <calendar-subscription :days="subscription.days || []"/>
    </block>
    <block margin="1">
      <select-fund />
    </block>
    <block margin="1">
      <card-default />
    </block>
    <block margin="1">
      <toggle-subscription />
    </block>
  </main>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const userId = useSupabaseUser()
  definePageMeta({
    pagename: 'Subscription',
    middleware: 'auth'
  })
  useHead({
    title: 'Subscription'
  })
  const getUserSubscription = async () => {
    const { data, error } = await supabase
      .from('getUserSubscriptions')
      .select()
      .eq('userId', userId.value.id)
      .limit(1)
      .single()
    if(error) {
      ok.log('error', 'Failed to get user subscription: ', error)
      return error
    } else {
      ok.log('', 'Got user subscription: '+data.amount+' '+data.currency+' on '+data.days)
      return data
    }
  }
  const getPaymentCardDefault = async () => {
    const { data, error } = await supabase
      .from('getPaymentCardDefault')
      .select()
      .eq('userId', userId.value.id)
    if(error) {
      ok.log('', 'Failed to get default card')
      return false
    } else {
      return true
    }
  }
  const defaultCard = await getPaymentCardDefault();
  if(!defaultCard){
    ok.log('error', 'User does not have default card')
    await navigateTo('/cards')
  }
  const subscription = await getUserSubscription();
  
</script>