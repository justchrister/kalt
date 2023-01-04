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

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const state = ref('loading')

  const address_line = ref('')

  const { data } = await useAsyncData('address_line', async () => {
    let { data } = await supabase
      .from('accounts')
      .select('address_line')
      .eq('user_id', user.value.id)
      .single()
    return data
  })

  if (data.value) address_line.value = data.value.address_line
  state.value = ''

  const updateProfile = async () => {
    state.value = 'loading'
    const { error } = await supabase.from('accounts').update({ address_line: address_line.value }).eq('user_id', user.value.id)
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };

</script>
