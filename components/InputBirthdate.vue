<template>
  <div>
    <label for="birthdate"> 
      Birthdate: 
    </label>
    <input
      type="date"
      v-model="birthdate"
      placeholder="Birthdate"
      id="birthdate"
      :class="'atom birthdate '+state"
      @input="updateProfile()"
    />
  </div>
</template>

<script setup>

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const state = ref('loading')

  const birthdate = ref('')

  const { data } = await useAsyncData('birthdate', async () => {
    let { data } = await supabase
      .from('accounts')
      .select('birthdate')
      .eq('user_id', user.value.id)
      .single()
    return data
  })

  if (data.value) birthdate.value = data.value.birthdate
  state.value = ''

  const updateProfile = async () => {
    state.value = 'loading'
    const { error } = await supabase.from('accounts').update({ birthdate: birthdate.value }).eq('user_id', user.value.id)
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };

</script>
