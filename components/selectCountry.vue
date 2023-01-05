<template>
  <div class="element select country">
    <label for="country"> 
      Country: 
    </label>
    <select v-model="country" @change="updateProfile()" :class="state">
      <option v-for="country of countries" :value="country.iso2" :key="country.iso2">{{country.name}}</option>
    </select>
  </div>
</template>

<script setup>
  const state = ref('loading')
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const { data: countries } = await supabase.from('countries').select('iso2, name').eq('available', true)

  const country = ref('')

  const { data } = await supabase
    .from('accounts')
    .select('country')
    .single()

  if (data) country.value = data.country

  state.value = ''

  const updateProfile = async () => {
    state.value = 'loading'
    const { error } = await supabase
      .from('accounts')
      .update({ country: country.value })
      .eq('user_id', user.id)
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };
</script>
