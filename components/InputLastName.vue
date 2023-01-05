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
  const state = ref('loading')
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const last_name = ref('')

  const { data } = await supabase
    .from('accounts')
    .select('last_name')
    .single()

  if (data) last_name.value = data.last_name

  state.value = ''

  const updateProfile = async () => {
    state.value = 'loading'
    const { error } = await supabase
      .from('accounts')
      .update({ last_name: last_name.value })
      .eq('user_id', user.id)
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };

</script>
