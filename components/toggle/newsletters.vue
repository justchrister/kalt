<template>
  <div class="input-wrap">
    <toggle text="Monthly newsletter" :on="isOn" @click="updateNewsletters()"/>
  </div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const isOn = ref()
  const { data, error } = await supabase
    .from('get_user')
    .select()
    .limit(1)
    .single()
  if(data) isOn.value = data.newsletters;
  ok.log('success', 'Got user object: ', data.newsletters)
  const toggleValue = async () => {
    if(isOn.value) return false
    else return true
  }
  const updateNewsletters = async () => {
    const toggledValue = await toggleValue()
    isOn.value = toggledValue
    message.post(supabase, 'user_preferences',{
      "messageSender": "components/toggle/newsletters.vue",
      "userId": user.value.id,
      "newsletters": isOn.value
    })
  }
</script>