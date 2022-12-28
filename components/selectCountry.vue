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

  const supabase = useSupabaseClient()
  const user = useSupabaseUser();

  const country = ref('')
  const state = ref('normal')

  let { data } = await supabase.from('accounts').select('country').eq('user_id', user.value.id).single()
  if (data) country.value = data.country

  let { data: countries } = await supabase.from('countries').select('iso2, name').eq('available', true)
  
  const updateProfile = async () => {
    const { error } = await supabase.from('accounts').update({ country: country.value }).eq('user_id', user.value.id)
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };

</script>
