<template>
  <div>
  <label>Country: </label>
  <nuxt-link to="/select/country">
    <span class="iso">{{countryDetails.iso2}}</span>
    <span>{{countryDetails.name}}</span>
    <span>→</span>
  </nuxt-link></div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const userId = useSupabaseUser()
  const user = await get(supabase).user(userId.value.id);
  
  const getcountryDetails = async (country) => {
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

  const countryDetails = await getCountryDetails(user.country);
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