<template>
  <div class="input-wrap">
    <toggle text="I accept the terms of service" :on="isOn" @click="updateTermsOfService()"/>
  </div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const userId = useSupabaseUser()
  const user = await get(supabase).user(userId.value.id);
  const isOn = ref(user.termsOfService || true) // pretty sure this is a good simplification, but might just be that if user.termsOfService is set to false, it will be set to true due to the falsely triggering the or operator

  const toggleValue = async () => {
    if(isOn.value) return false
    else return true
  }
  const updateTermsOfService = async () => {
    const toggledValue = await toggleValue()
    isOn.value = toggledValue
    const { error } = await pub(supabase, {
      sender:'components/toggle/termsOfService.vue',
      entity: userId.value.id
    }).userPreferences({
      userId: userId.value.id,
      termsOfService: isOn.value
    });
    if(error) {
      ok.log('error', 'Error updating user preferences: ', error)
    } else {
      ok.log('success', 'Updated user preferences')
    }
  }
</script>
