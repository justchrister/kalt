<template>
  <div class="input-wrap">
    <toggle text="Monthly newsletter" :on="isOn" @click="updateTos()"/>
  </div>
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const isOn = ref()
  const { data, error } = await supabase
    .from('get_user')
    .select()
    .limit(1)
    .single()
  if(data) isOn.value = data.email_marketing;
  ok.log('success', 'Got user object: ', data.email_marketing)
  const xxx = async () => {
    if(isOn.value) return false
    else return true
  }
  const updateTos = async () => {
    const x = await xxx()
    isOn.value = x
    message.post(supabase, 'user_preferences',{
      "messageSender": "components/toggle/emails.vue",
      "userId": user.value.id,
      "emailMarketing": x
    })
  }
</script>