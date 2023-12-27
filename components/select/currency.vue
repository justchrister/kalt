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
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value)

  const getCurrencyDetails = async (currency) => {
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

  const currencyDetails = await getCurrencyDetails(user.currency || 'EUR');
</script>
<style scoped lang="scss">
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