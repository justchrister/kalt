<template>
  <div class="input-wrap">
    <toggle text="Monthly newsletter" :on="isOn" @click="updateNewsletters()"/>
  </div>
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient();
  const auth = useSupabaseUser();
  const user = await get(supabase).user(auth.value) as user;

  const isOn = ref()
  isOn.value = user.newsletters;

  const toggleValue = async () => {
    if(isOn.value) return false
    else return true
  }
  const updateNewsletters = async () => {
    const toggledValue = await toggleValue()
    isOn.value = toggledValue
    
    const error = await pub(supabase, {
      sender: 'components/toggle/newsletters.vue',
      id: user?.id
    }).users({
      newsletters: isOn.value
    });
    if(error) {
      ok.log('error', 'Error updating user preferences: '+error.message)
    } else {
      if(isOn.value) ok.log('', 'Subscribed to newsletters')
      else ok.log('', 'Unsubscribed from newsletters')
    }
  }
</script>