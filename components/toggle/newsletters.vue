<template>
  <div class="input-wrap">
    <toggle text="Monthly newsletter" :on="isOn" @click="updateNewsletters()"/>
  </div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const userId = useSupabaseUser()
  const isOn = ref()
  const user = await get(supabase).user(userId.value.id);
  isOn.value = user.newsletters;
  
  const toggleValue = async () => {
    if(isOn.value) return false
    else return true
  }
  const updateNewsletters = async () => {
    const toggledValue = await toggleValue()
    isOn.value = toggledValue
    
    const { error } = await pub(supabase, {
      sender: 'components/toggle/newsletters.vue',
      entity: user.value.id
    }).userPreferences({
      userId: user.value.id,
      newsletters: isOn.value
    });
    if(error) {
      ok.log('error', 'Error updating user preferences: ', error)
    } else {
      ok.log('success', 'Updated user preferences')
    }
  }
</script>