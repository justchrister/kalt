<template>
  <div class="element input text">
    <label for="address-line"> 
      Address line: 
    </label>
    <input
      type="text"
      v-model="address_line"
      placeholder="Address line"
      id="address-line"
      :class="'atom address-line '+state"
      @input="updateProfile()"
    />
  </div>
</template>

<script setup>
  const state = ref('loading')
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const address_line = ref('')

  const { data } = await supabase
    .from('accounts')
    .select('address_line')
    .single()

  if (data) address_line.value = data.address_line

  state.value = ''

  const updateProfile = async () => {
    state.value = 'loading'
    const { error } = await supabase
      .from('accounts')
      .update({ address_line: address_line.value })
      .eq('user_id', user.id)
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };
</script>
