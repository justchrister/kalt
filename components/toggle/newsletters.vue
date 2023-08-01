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
    .from('getUser')
    .select()
    .limit(1)
    .single()
  if(data) isOn.value = data.newsletters;
  const toggleValue = async () => {
    if(isOn.value) return false
    else return true
  }
  const updateNewsletters = async () => {
    const toggledValue = await toggleValue()
    isOn.value = toggledValue
    
    const { error, data } = await pub(supabase, {
      sender:'components/toggle/newsletters.vue'
    }).userPreferences({
      "userId": user.value.id,
      "newsletters": isOn.value
    });
  }
</script>