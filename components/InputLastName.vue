<template>
  <div>
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
  const user = useSupabaseUser();

  const last_name = ref('')
  const state = ref('normal')

  let { data } = await supabase.from('accounts').select('last_name').eq('user_id', user.value.id).single()

  if (data) last_name.value = data.last_name
  
  const updateProfile = async () => {
    const { error } = await supabase.from('accounts').update({ last_name: last_name.value }).eq('user_id', user.value.id)
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };

</script>
