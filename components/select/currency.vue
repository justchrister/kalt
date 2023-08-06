<template>
  <div>
  <label>Select preferred currency: </label>
  <nuxt-link to="/select/currency">
    <span class="iso">{{currencyDetails.iso}}</span>
    <span>{{currencyDetails.name}}</span>
    <span>→</span>
  </nuxt-link>
  </div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const getPreferredCurrency = async () => {
    const { data, error } = await supabase
      .from('getUser')
      .select('currency')
      .eq('userId', user.value.id)
      .limit(1)
      .single()
    if(error){
      return 'EUR'
    } else {
      return data.currency
    }
  }
  const getCurrencyDetails = async (iso) => {
    const { data, error } = await supabase
      .from('sys_currencies')
      .select()
      .eq('enabled', true)
      .eq('iso', currency)
      .limit(1)
      .single()
    if(data){
      return data
    } else {
      ok.log('', 'could not get currency details: '+error.message)
      return {
        iso: '?', 
        name: 'Could not get currency details'
      }
    }
  }

  const currency = await getPreferredCurrency();
  const currencyDetails = await getCurrencyDetails(currency);
</script>
<style scoped lang="scss">
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