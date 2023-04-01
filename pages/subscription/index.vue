
<template>
  <main>
    <navbar-tabs />
    <block margin="half">
      <input-amount-subscription :uuid="uuid" :amount="amount" :currency="currency"/>
    </block>
    <block margin="half">
      <label>Select which days you want to auto-invest</label>
      <calendar-subscription :uuid="uuid" :days="days" v-if="uuid"/>
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

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const uuid = ref()
  const days = ref([])
  const amount = ref('')
  const currency = ref('')
  const enabled = ref(false)

  const getSubscription = async () => {
    const { data, error } = await supabase
      .from('subscriptions')
      .select()
      .eq('user_id', user.value.id)
      .limit(1)
      .single()
    if(error) return null
    uuid.value = data.subscription_id
    amount.value = data.amount
    currency.value = data.currency
    days.value = data.days
    enabled.value = data.enabled
    if (error) ok.log("error", "could not find subscription")
    if (data) ok.log("success", "got subscription: " + uuid.value)
  }
  const createSubscription = async () => {
    const { data, error } = await supabase
      .from('subscriptions')
      .insert({
        user_id: user.value.id
      })
      .select()
      .single()
    uuid.value = data.subscription_id
    if (error) ok.log("error", "could not create subscription")
    if (data) ok.log("success", "created subscription: " + uuid.value)
  }

  const subscription = await getSubscription()
  if(subscription===null) await createSubscription()
  let tempEnabled
  const toggleSubscription = async () => {
    if(enabled.value===true) {
      ok.log('success','paused subscription')
      tempEnabled=false
    }
    if(enabled.value===false) {
      ok.log('success','started subscription')
      tempEnabled=true
    }
    const { data, error } = await supabase
      .from('subscriptions')
      .update({
        enabled: tempEnabled
      })
      .eq('subscription_id', uuid.value)
      .select()
      .single()
    enabled.value=data.enabled
  }

</script>