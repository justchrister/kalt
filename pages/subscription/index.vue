
<template>
  <main>
    <navbar :pageTitle="pagename" />
    <div class="page">
      <div class="section">
        <navbar-tabs />
        <choose-amount-subscription :uuid="uuid" :amount="amount" :currency="currency"/>
        <div class="block">
          <label>Select which days you want to auto-invest</label>
          <calendar-subscription :uuid="uuid" :days="days" v-if="uuid"/>
        </div>
        <div class="block">
          <label>Select card you want to withdraw:</label>
          <default-card />
          <info-box type="info" text="changing default card will change card being charged" />
        </div>
        <div class="block">
          <button @click="toggleSubscription()">
            <span v-if="enabled">pause subscription</span>
            <span v-else>start subscription</span>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
  const pagename = 'Subscription';
  const title = 'Kalt — ' + pagename;
  const router = useRouter()
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  useHead({
    title,
    meta: [{
      name: "description",
      content: "Make money, make a difference."
    }]
  });
  definePageMeta({
    middleware: 'auth'
  });

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
    if (error) oklog("error", "could not find subscription")
    if (data) oklog("success", "got subscription: " + uuid.value)
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
    if (error) oklog("error", "could not create subscription")
    if (data) oklog("success", "created subscription: " + uuid.value)
  }

  const subscription = await getSubscription()
  if(subscription===null) await createSubscription()
  let tempEnabled
  const toggleSubscription = async () => {
    if(enabled.value===true) {
      oklog('success','paused subscription')
      tempEnabled=false
    }
    if(enabled.value===false) {
      oklog('success','started subscription')
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