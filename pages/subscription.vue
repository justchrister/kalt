
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
  const user = await get(supabase).user(userId.value.id)
  definePageMeta({
    pagename: 'Subscription',
    middleware: 'auth'
  })
  useHead({
    title: 'Subscription'
  })

  const defaultCard = await get(supabase).defaultPaymentCard(user);
  if(!defaultCard){
    ok.log('error', 'User does not have default card')
    await navigateTo('/cards')
  }
  const subscription = await get(supabase).subscription(userId.value.id);
  ok.log('', subscription)
  
</script>