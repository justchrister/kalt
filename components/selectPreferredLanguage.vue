<template>
  <div class="element select preferred_language">
    <label for="preferred_language"> 
      Language: 
    </label>
    <select v-model="preferred_language" @change="updateProfile()" :class="state">
      <option v-for="country of languages" :value="country.iso6393" :key="country.iso6393">{{country.name}}</option>
    </select>
  </div>
</template>

<script setup>

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const state = ref('loading')

  const preferred_language = ref('')

  const { data } = await useAsyncData('preferred_language', async () => {
    let { data } = await supabase
      .from('accounts')
      .select('preferred_language')
      .eq('user_id', user.value.id)
      .single()
    return data
  })
  
  if (data.value) preferred_language.value = data.value.preferred_language
  state.value = ''

  let { data: languages } = await supabase
    .from('languages')
    .select('iso6393, name')
    .eq('available', true)
  
  const updateProfile = async () => {
    const { data, error } = await supabase
      .from('accounts')
      .update({ preferred_language: preferred_language.value })
      .eq('user_id', user.value.id)
      .select()
      .single()
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };

</script>
