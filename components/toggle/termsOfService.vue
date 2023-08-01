<template>
  <div class="input-wrap">
    <toggle text="I accept the terms of service" :on="isOn" @click="updateTermsOfService()"/>
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
  if(data) isOn.value = data.terms_of_service;
  ok.log('success', 'Got user preference: ', data.terms_of_service)
  const toggleValue = async () => {
    if(isOn.value) return false
    else return true
  }
  const updateTermsOfService = async () => {
    const toggledValue = await toggleValue()
    isOn.value = toggledValue
    const { error, data } = await pub(supabase, {
      sender:'components/toggle/termsOfService.vue'
    }).userPreferences({
      'userId': user.value.id,
      "termsOfService": isOn.value
    });
  }
</script>
