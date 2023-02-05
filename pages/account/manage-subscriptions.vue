
<template>
  <div class="PageWrapper">
    <div class="page">
      <div class="section">
        <h1>Manage subscription</h1>
        <div class="block">
        <h3>Select amount you want to auto-invest</h3>
        </div>
        <div class="block">
          <h3>Select which days you want to auto-invest</h3>
          <calendar-subscription :uuid="uuid" :days="days" v-if="uuid"/>
        </div>
        <div class="block">
          Select card you want to withdraw: 
          <nuxt-link to="/account/manage-cards">
            <default-card />
          </nuxt-link>
          <info-box type="info" text="changing default card will change card being charged" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  const pagename = 'Buy';
  const title = 'Kalt — ' + pagename;
  const description = ref('My App Description')
  const router = useRouter()
  const supabase = useSupabaseClient()
  const {data: {user}} = await supabase.auth.getUser()
  useHead({
    title,
    meta: [
      {
        name: "description",
        content: description,
      },
    ],
  });
  definePageMeta({
    layout: "focused",
  });

  const uuid = ref()
  const days = ref([])
  const amount = ref('')
  const currency = ref('')

  const getSubscription = async () => {
    const { data, error } = await supabase
      .from('subscriptions')
      .select()
      .eq('user_id', user.id)
      .limit(1)
      .single()
    console.log(error)
    console.log(data)
    if(error) return null
    uuid.value = data.subscription_id
    amount.value = data.amount
    currency.value = data.currency
    days.value = data.days
    if (error) oklog("error", "could not find subscription")
    if (data) oklog("success", "got subscription: " + uuid.value)
    if (data.amount) oklog("", "amount: " + amount.value)
    if (data.currency) oklog("", "amount: " + currency.value)
    if (data.days) oklog("", "amount: " + days.value)
  }
  const createSubscription = async () => {
    const { data, error } = await supabase
      .from('subscriptions')
      .insert({
        user_id: user.id
      })
      .select()
      .single()
    uuid.value = data.subscription_id
    if (error) oklog("error", "could not create subscription")
    if (data) oklog("success", "created subscription: " + uuid.value)
  }

  const subscription = await getSubscription()
  if(subscription===null) await createSubscription()
  
  const completeSubscription = async (uuid) => {
  }

</script>