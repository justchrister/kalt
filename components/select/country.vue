<template>
  <div>
  <label>Country: </label>
  <nuxt-link to="/select/country">
    <span class="iso">{{countryDetails.iso2}}</span>
    <span>{{countryDetails.name}}</span>
    <span>→</span>
  </nuxt-link></div>
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;
  
  const getCountryDetails = async (country) => {
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

  const countryDetails = await getCountryDetails(user?.country);
</script>
<style scoped lang="scss">
  div{
    margin: sizer(1) 0 0 0 ;
  }
  a{
    padding: sizer(1) sizer(2);
    display:grid;
    grid-template-columns: sizer(4) 4fr sizer(1);
    text-decoration:none;
    @include border;
    @include hoverable;
    &:hover{
      @include hovering;
    }
  }
  .iso{
    font-family:"Kalt Monospace", monospace;
    font-size:75%;
  }
</style>