
<template>
  <main>
    <navbar-tabs />
    <block margin="none">
      <info-box type="success" text="With automatic investment set to 100% and automatic transfers to Kalt, you can set up a low-cost alternative to subscriptions ✨" />
    </block>
    <block margin="half">
      <input-amount-subscription :amount="subscription.amount"/>
    </block>
    <block margin="half">
      <label>Select which days you want to auto-invest</label>
      <calendar-subscription :days="subscription.days_of_month"/>
    </block>
    <block margin="half">
      <label>Select card you want to withdraw:</label>
      <card-default />
      <info-box type="info" text="changing default card will change card being charged" />
    </block>
    <block margin="half">
      <toggle-subscription />
    </block>
  </main>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  definePageMeta({
    pagename: 'Subscription',
    middleware: 'auth'
  })
  useHead({
    title: 'Subscription'
  })
  const getUserSubscription = async () => {
    
    const { data, error } = await supabase
      .from('get_user_subscription')
      .select()
      .eq('user_id', user.value.id)
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
  const subscription = await getUserSubscription();

</script>