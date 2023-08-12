<template>
  <div class="input-wrap">
    <toggle text="I accept the terms of service" :on="isOn" @click="updateTermsOfService()"/>
  </div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const isOn = ref(true)
  const { data, error } = await supabase
    .from('getUser')
    .select()
    .limit(1)
    .single()
  if(data) {
    isOn.value = data.termsOfService;
    ok.log('success', 'Got user preference: ', data.termsOfService)
  }
  const toggleValue = async () => {
    if(isOn.value) return false
    else return true
  }
  const updateTermsOfService = async () => {
    const toggledValue = await toggleValue()
    isOn.value = toggledValue
    const { error } = await pub(supabase, {
      sender:'components/toggle/termsOfService.vue',
      entity: user.value.id
    }).userPreferences({
      userId: user.value.id,
      termsOfService: isOn.value
    });
    if(error) {
      ok.log('error', 'Error updating user preferences: ', error)
    } else {
      ok.log('success', 'Updated user preferences')
    }
  }
</script>
