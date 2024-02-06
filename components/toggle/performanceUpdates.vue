<template>
  <div class="input-wrap">
    <toggle text="Performance updates" :on="isOn" @click="updatePerformanceUpdates()"/>
  </div>
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;
  const isOn = ref(true)
  isOn.value = user?.performanceUpdates;
  
  if(user && user.performanceUpdates) {
    isOn.value = user.performanceUpdates;
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
    
    const error = await pub(supabase, {
      sender:'components/toggle/performanceUpdates.vue',
      id: user?.id
    }).users({
      performanceUpdates: isOn.value
    })
    if(error) {
      ok.log('error', 'Error updating user preferences: ', error)
    } else {
      if(isOn.value) ok.log('', 'Subscribed to performance updates')
      else ok.log('', 'Unsubscribed from performance updates')
    }
  }
</script>
