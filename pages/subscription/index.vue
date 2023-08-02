
<template>
  <main>
    <navbar-tabs />
    <block margin="2">
      <info-box type="success" text="With automatic investment set to 100% and automatic transfers to Kalt, you can set up a low-cost alternative to subscriptions ✨" />
    </block>
    <block margin="2">
      <input-amount-subscription :amount="subscription.amount"/>
    </block>
    <block margin="2">
      <label>Select which days you want to auto-invest</label>
      <calendar-subscription :days="subscription.days"/>
    </block>
    <block margin="2">
      <label>Select card you want to withdraw:</label>
      <card-default />
      <info-box type="info" text="changing default card will change card being charged" />
    </block>
    <block margin="2">
      <toggle-subscription />
    </block>
  </main>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  definePageMeta({
    pagename: 'Subscription',
    middleware: ['default', 'auth']
  })
  useHead({
    title: 'Subscription'
  })
  const getUserSubscription = async () => {
    const { data, error } = await supabase
      .from('getUserSubscription')
      .select()
      .eq('userId', user.value.id)
      .limit(1)
      .single()
    if(data) {
      ok.log('success', 'Got user subscription: ', data)
      return data
    }
    if(error) {
      ok.log('error', 'Failed to get user subscription: ', error)
      return error
    }
  }
  const getPaymentCardDefault = async () => {
    const { data, error } = await supabase
      .from('getPaymentCardDefault')
      .select()
      .eq('userId', user.value.id)
    if(error) return false
    if(data) return true
  }
  const defaultCard = await getPaymentCardDefault();
  if(defaultCard){
    ok.log('success', 'User has default card')
  } else {
    ok.log('error', 'User does not have default card')
    await navigateTo('/cards')
  }
  const subscription = await getUserSubscription();

</script>