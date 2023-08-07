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
    .from('getUser')
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
    
    const { error } = await pub(supabase, {
      sender:'components/toggle/performanceUpdates.vue',
      entity: user.value.id
    }).userPreferences({
      userId: user.value.id,
      performanceUpdates: isOn.value
    })
    if(error) {
      ok.log('error', 'Error updating user preferences: ', error)
    } else {
      ok.log('success', 'Updated user preferences')
    }
  }
</script>
