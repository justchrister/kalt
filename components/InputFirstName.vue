<template>
  <div class="element input text">
    <label for="first-name"> 
      First name: 
    </label>
    <input
      type="text"
      v-model="first_name"
      placeholder="First name"
      id="first-name"
      :class="'atom first-name '+state"
      @input="updateProfile()"
    />
  </div>
</template>

<script setup>

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const state = ref('loading')

  const first_name = ref('')

  const { data } = await useAsyncData('first_name', async () => {
    let { data } = await supabase
      .from('accounts')
      .select('first_name')
      .eq('user_id', user.value.id)
      .single()
    return data
  })

  if (data.value) first_name.value = data.value.first_name
  state.value = ''

  const updateProfile = async () => {
    state.value = 'loading'
    const { error } = await supabase.from('accounts').update({ first_name: first_name.value }).eq('user_id', user.value.id)
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };

</script>
