
<template>
  <div class="PageWrapper">
    <div class="page">
      <div class="section">
        <tabs />
        <div class="block">
          <p>Select amount you want to auto-invest</p>
          <select-amount for="subscription" :uuid="uuid" />
        </div>
        <div class="block">
          <p>Select which days you want to auto-invest</p>
          <calendar-subscription :uuid="uuid" :days="days" v-if="uuid"/>
        </div>
        <div class="block">
          Select card you want to withdraw: 
          <nuxt-link to="/account/manage-cards">
            <default-card />
          </nuxt-link>
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
    enabled.value = data.enabled
    if (error) oklog("error", "could not find subscription")
    if (data) oklog("success", "got subscription: " + uuid.value)
    if (data.amount) oklog("", "amount: " + amount.value)
    if (data.currency) oklog("", "currency: " + currency.value)
    if (data.days) oklog("", "days: " + days.value)
    if (data.enabled) oklog("", "status: " + enabled.value)
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
  
  const toggleSubscription = async () => {
    if(enabled.value){
      enabled.value = false
      console.log(enabled.value)
    } 
    if(enabled.value===false) enabled.value = true
    const { data, error } = await supabase
      .from('subscriptions')
      .update({
        enabled: enabled.value
      })
      .eq('subscription_id', uuid.value)
      .select()
      .single()
    if(enabled.value){
      oklog("success", "enabled subscription")
      return
    }
    oklog("success", "disabled subscription")
  }

</script>