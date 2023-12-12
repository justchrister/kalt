
<template>
  <main>
    <navbar-tabs />
    <block margin="1">
      <input-amount-subscription :amount="subscription.amount || 0"/>
    </block>
    <block margin="2">
      <label>Select which days you want to auto-invest</label>
    </block>
    <block margin="1">
      <select-fund />
    </block>
    <block margin="1">
      <card-default />
    </block>
    <block margin="1">
      <toggle-subscription :on="subscription.active"/>
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