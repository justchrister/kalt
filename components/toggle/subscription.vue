<template>
  <div class="input-wrap">
    <toggle text="Subscription active" :on="isOn" @click="toggleSubscription()"/>
  </div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const isOn = ref()
  const { data, error } = await supabase
    .from('get_user_subscription')
    .select()
    .limit(1)
    .single()
  if(data) isOn.value = data.active;
  ok.log('success', 'Got user preference: ', data.terms_of_service)
  const toggleValue = async () => {
    if(isOn.value) return false
    else return true
  }
  const toggleSubscription = async () => {
    const toggledValue = await toggleValue()
    isOn.value = toggledValue
    message.post(supabase, 'user_subscriptions',{
      "messageSender": "components/toggle/subscription.vue",
      "messageEntityId": user.value.id,
      "userId": user.value.id,
      "active": isOn.value
    })
  }
</script>
