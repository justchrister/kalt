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
  const state = ref('loading')
  const supabase = useSupabaseClient()
  const {data: {user}} = await supabase.auth.getUser()
  const { data: languages } = await supabase.from('languages').select('iso6393, name').eq('available', true)

  const preferred_language = ref('')

  const { data } = await supabase
    .from('accounts')
    .select('preferred_language')
    .single()

  if (data) preferred_language.value = data.preferred_language

  state.value = ''

  const updateProfile = async () => {
    state.value = 'loading'
    const { error } = await supabase
      .from('accounts')
      .update({ preferred_language: preferred_language.value })
      .eq('user_id', user.id)
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };
</script>
