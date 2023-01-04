<template>
  <div class="element input text">
    <label 
      class="atom"
      for="first-name"> 
      First name: 
    </label>
    <input
      :class="'atom '+ state"
      type="text"
      v-model="first_name"
      placeholder="First name"
      id="first-name"
      @input="updateProfile()"
    />
  </div>
</template>

<script setup>

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const state = ref('loading')

  const first_name = ref('')

  const { data } = await supabase.from('accounts').select('first_name').eq('user_id', user.value.id).single()

  if (data) {
    first_name.value = data.first_name
    state.value = ''
  }

  
  const updateProfile = async () => {
    state.value = 'loading'
    const { data, error } = await supabase.from('accounts').update({ first_name: first_name.value }).eq('user_id', user.value.id).select().single()
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };

</script>