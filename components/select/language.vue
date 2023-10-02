<template>
  <div>
  <label>Language: </label>
  <nuxt-link to="/select/language">
    <span class="iso">{{languageDetails.iso}}</span>
    <span>{{languageDetails.name}}</span>
    <span>→</span>
  </nuxt-link></div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const userId = useSupabaseUser()
  const user = await get(supabase).user(userId.value.id);
  
  const getLanguageDetails = async () => {
    const { data, error } = await supabase
      .from('sys_languages')
      .select()
      .eq('available', true)
      .eq('iso', language)
      .limit(1)
      .single()
    if(data && data.iso && data.name) {
      return data
    } else {
      return {
        iso: '?',
        name: 'Could not get language details'
      }
    }
  }

  const languageDetails = await getLanguageDetails(user.language);
</script>
<style scoped lang="scss">
  div{
    margin:$clamp 0 0 0 ;
  }
  a{
    padding:$clamp $clamp-2;
    display:grid;
    grid-template-columns: $clamp-4 4fr $clamp;
    border:$border;
    text-decoration:none;
    &:hover{
      cursor: pointer;
      background:white;
    }
  }
  .iso{
    font-family:"Kalt Monospace", monospace;
    font-size:75%;
  }
/*
  .dark-mode a{
    border-color:$light;
    &:hover{
      background:$dark;
    }
  }*/
</style>