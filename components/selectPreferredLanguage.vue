<template>
  <div>
    <label for="preferred_language"> 
      Preferred language: 
    </label>
    <select v-model="preferred_language" @change="updateProfile()" :class="state">
      <option v-for="language of languages" :value="language.iso6393" :key="language.iso6393">{{language.name}}</option>
    </select>
  </div>
</template>

<script setup>

  const supabase = useSupabaseClient()
  const user = useSupabaseUser();

  const preferred_language = ref('')
  const state = ref('normal')

  let { data } = await supabase.from('accounts').select('preferred_language').eq('user_id', user.value.id).single()
  if (data) preferred_language.value = data.preferred_language

  let { data: language } = await supabase.from('languages').select('iso6393,language_name').eq('available', true)
  
  const updateProfile = async () => {
    const { error } = await supabase.from('accounts').update({ preferred_language: preferred_language.value }).eq('user_id', user.value.id)
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };

</script>
