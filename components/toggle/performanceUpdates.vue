<template>
  <div class="input-wrap">
    <toggle text="Performance updates" :on="isOn" @click="updatePerformanceUpdates()"/>
  </div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const userId = useSupabaseUser()
  const user = await get(supabase).user(userId.value.id);
  const isOn = ref(user.performanceUpdates || true)
  
  if(user && user.performanceUpdates) {
    isOn.value = user.performanceUpdates;
    ok.log('success', 'Got user preference on performanceUpdates: ', user.performanceUpdates)
  }
  const toggleValue = async () => {
    if(isOn.value){
      return false
    } else {
      return true
    }
  }
  const updatePerformanceUpdates = async () => {
    const toggledValue = await toggleValue()
    isOn.value = toggledValue
    
    const { error } = await pub(supabase, {
      sender:'components/toggle/performanceUpdates.vue',
      entity: userId.value.id
    }).user({
      userId: userId.value.id,
      performanceUpdates: isOn.value
    })
    if(error) {
      ok.log('error', 'Error updating user preferences: ', error)
    } else {
      ok.log('success', 'Updated user preferences')
    }
  }
</script>
