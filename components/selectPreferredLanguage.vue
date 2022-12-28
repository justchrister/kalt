<template>
  <div class="element select language">
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
  
  let { data: languages } = await supabase.from('languages').select('iso6393,name').eq('available', true)


  if (data && languages) preferred_language.value = data.preferred_language

  const updateProfile = async () => {
    const { error } = await supabase.from('accounts').update({ preferred_language: preferred_language.value }).eq('user_id', user.value.id)
    if(error){
      state.value="error"
    } else {
      state.value="success"
    }
  };

</script>
