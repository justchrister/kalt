<template>
  <div class="element input text">
    <label for="last-name"> 
      Last name: 
    </label>
    <input
      type="text"
      v-model="last_name"
      placeholder="Last name"
      id="last-name"
      :class="'atom last-name '+state"
      @input="updateProfile()"
    />
  </div>
</template>

<script setup>

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const state = ref('loading')

  const last_name = ref('')

  const { data } = await useAsyncData('last_name', async () => {
    let { data } = await supabase
      .from('accounts')
      .select('last_name')
      .eq('user_id', user.value.id)
      .single()
    return data
  })

  if (data.value) last_name.value = data.value.last_name
  state.value = ''

  const updateProfile = async () => {
    state.value = 'loading'
    const { error } = await supabase.from('accounts').update({ last_name: last_name.value }).eq('user_id', user.value.id)
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };

</script>
