<template>
  <div class="input-wrap">
    <toggle text="Performance updates" :on="isOn" @click="updatePerformanceUpdates()"/>
  </div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const isOn = ref()
  const { data, error } = await supabase
    .from('get_user')
    .select()
    .limit(1)
    .single()
  if(data) isOn.value = data.performance_updates;
  ok.log('success', 'Got user preference: ', data.performance_updates)
  const toggleValue = async () => {
    if(isOn.value) return false
    else return true
  }
  const updatePerformanceUpdates = async () => {
    const toggledValue = await toggleValue()
    isOn.value = toggledValue
    message.post(supabase, 'user_preferences',{
      "messageSender": "components/toggle/performanceUpdates.vue",
      "userId": user.value.id,
      "performanceUpdates": isOn.value
    })
  }
</script>
