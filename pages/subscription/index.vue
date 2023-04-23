
<template>
  <main>
    <navbar-tabs />
    <block margin="half">
      <input-amount-subscription :amount="data.amount"/>
    </block>
    <block margin="half">
      <label>Select which days you want to auto-invest</label>
      <calendar-subscription :days="data.days_of_month"/>
    </block>
    <block margin="half">
      <label>Select card you want to withdraw:</label>
      <card-default />
      <info-box type="info" text="changing default card will change card being charged" />
    </block>
    <block margin="half">
      <toggle text="Subscription enabled " @click="toggleSubscription()" :on="enabled"/>
    </block>
  </main>
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  definePageMeta({
    pagename: 'Subscription',
    middleware: 'auth'
  })
  useHead({
    title: 'Subscription',
    meta: [{
      name: "description",
      content: "Make money, make a difference."
    }]
  })

  const enabled = ref(false)

  const { data, error } = await supabase
    .from('get_user_subscription')
    .select()
    .eq('user_id', user.value.id)
    .limit(1)
    .single()
  const toggleSubscription = async () => {
    const { data, error } = await supabase
      .from('user_subscriptions')
      .update({
        message_sender: 'pages/subscription/index.vue',
        enabled: false
      })
      .select()
      .single()
    enabled.value=data.enabled
  }

</script>