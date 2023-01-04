<template>
  <div class="element input text">
    <label for="postal-code"> 
      Postal code: 
    </label>
    <input
      type="text"
      v-model="postal_code"
      placeholder="Postal code"
      id="postal-code"
      :class="'atom postal-code '+state"
      @input="updateProfile()"
    />
  </div>
</template>

<script setup>

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const state = ref('loading')

  const postal_code = ref('')

  const { data } = await useAsyncData('postal_code', async () => {
    let { data } = await supabase
      .from('accounts')
      .select('postal_code')
      .eq('user_id', user.value.id)
      .single()
    return data
  })

  if (data.value) postal_code.value = data.value.postal_code
  state.value = ''

  const updateProfile = async () => {
    state.value = 'loading'
    const { error } = await supabase.from('accounts').update({ postal_code: postal_code.value }).eq('user_id', user.value.id)
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };

</script>
