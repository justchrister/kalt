<template>
  <div>
    <label for="city"> 
      City: 
    </label>
    <input
      type="text"
      v-model="city"
      placeholder="City"
      id="city"
      :class="'atom city '+state"
      @input="updateProfile()"
    />
  </div>
</template>

<script setup>

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const state = ref('loading')

  const city = ref('')

  const { data } = await useAsyncData('city', async () => {
    let { data } = await supabase
      .from('accounts')
      .select('city')
      .eq('user_id', user.value.id)
      .single()
    return data
  })

  if (data.value) city.value = data.value.city
  state.value = ''

  const updateProfile = async () => {
    state.value = 'loading'
    const { error } = await supabase.from('accounts').update({ city: city.value }).eq('user_id', user.value.id)
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };

</script>
