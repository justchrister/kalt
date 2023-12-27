<template>
  <div>
  <label>Language: </label>
  <nuxt-link to="/select/language">
    <span class="iso">{{languageDetails.iso}}</span>
    <span>{{languageDetails.name}}</span>
    <span>→</span>
  </nuxt-link></div>
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;
  
  const getLanguageDetails = async (language) => {
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
/*
  .dark-mode a{
    border-color: $light;
    &:hover{
      background: $dark;
    }
  }*/
</style>