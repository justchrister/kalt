<template>
  <div>
  <label>country: </label>
  <nuxt-link to="/select/country">
    <span class="iso">{{countryDetails.iso2}}</span>
    <span>{{countryDetails.name}}</span>
    <span>→</span>
  </nuxt-link></div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const getPreferredcountry = async () => {
    const { data, error } = await supabase
      .from('getUser')
      .select('country')
      .eq('userId', user.value.id)
      .limit(1)
      .single()
    if(error) {
      ok.log('error', 'Could not get preferred country', error)
      return ''
    } else {
      if(data) ok.log('success', 'Got preferred country: ', data.country)
      return data.country
    }
  }
  const getcountryDetails = async () => {
    const { data, error } = await supabase
      .from('sys_countries')
      .select()
      .eq('iso2', country)
      .limit(1)
      .single()
    if(data) return data
    if(error) return {
      name: 'Add your country'
    }
  }

const country = await getPreferredcountry();
const countryDetails = await getcountryDetails();
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