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
    .from('getUserSubscription')
    .select()
    .limit(1)
    .single()
  if(data) isOn.value = data.active;
  const toggleValue = async () => {
    if(isOn.value) return false
    else return true
  }
  const toggleSubscription = async () => {
    const toggledValue = await toggleValue()
    isOn.value = toggledValue
    const { error, data } = await pub(supabase, {
      sender:'components/toggle/subscription.vue',
      entity: user.value.id
    }).userSubscriptions({
      'userId': user.value.id,
      'active': isOn.value
    });
  }
</script>
