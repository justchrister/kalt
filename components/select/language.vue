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
  const user = useSupabaseUser()

  const getPreferredLanguage = async () => {
    const { data, error } = await supabase
      .from('get_user')
      .select('language')
      .eq('user_id', user.value.id)
      .limit(1)
      .single()
    if(data) ok.log('success', 'Got user object: ', data)
    if(error) ok.log('error', 'Could not get preferred language', error)
    return data.language
  }
  const getLanguageDetails = async () => {
    const { data, error } = await supabase
      .from('languages')
      .select()
      .eq('enabled', true)
      .eq('iso', language)
      .limit(1)
      .single()
    if(data) return data
    if(error) return {iso: '?', name: 'Could not get language details'}
  }

const language = await getPreferredLanguage();
const languageDetails = await getLanguageDetails();
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
</style>