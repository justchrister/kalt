<template>
  <div class="input-wrap">
    <toggle text="I accept the terms of service" :on="isOn" @click="updateTermsOfService()"/>
  </div>
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;
  const isOn = ref(true) 
  isOn.value = user.termsOfService || true;

  const toggleValue = async () => {
    if(isOn.value) return false
    else return true
  }
  const updateTermsOfService = async () => {
    const toggledValue = await toggleValue()
    isOn.value = toggledValue
    const error = await pub(supabase, {
      sender:'components/toggle/termsOfService.vue',
      id: user?.id
    }).users({
      termsOfService: isOn.value
    });
    if(error) {
      ok.log('error', 'Error updating user preferences: ', error)
    } else {
      if(isOn.value) ok.log('', 'Accepted terms of service')
      else ok.log('', 'Declined terms of service')
    }
  }
</script>
