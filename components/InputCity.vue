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
  const state = ref('loading')
  const supabase = useSupabaseClient()
  const {data: {user}} = await supabase.auth.getUser()

  const city = ref('')

  const { data } = await supabase
    .from('accounts')
    .select('city')
    .single()

  if (data) city.value = data.city

  state.value = ''

  const updateProfile = async () => {
    state.value = 'loading'
    const { error } = await supabase
      .from('accounts')
      .update({ city: city.value })
      .eq('user_id', user.id)
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };

</script>
