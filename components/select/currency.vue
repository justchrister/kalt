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
      .from('get_user')
      .select('currency')
      .eq('user_id', user.value.id)
      .limit(1)
      .single()
    return data.currency
  }

  const currency = await getPreferredCurrency();
  const getCurrencyDetails = async () => {
    const { data, error } = await supabase
      .from('currencies')
      .select()
      .eq('enabled', true)
      .eq('iso', currency)
      .limit(1)
      .single()
    if(data) return data
    return {iso: '?', name: 'Could not get currency details'}
  }
  const currencyDetails = await getCurrencyDetails();
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