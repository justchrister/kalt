<template>
  <main>
    <ul>
      <span @click="navigateTo('/profile')">← back</span>
      <li v-for="currency of data" :value="currency.iso" :key="currency.iso" @click="updateProfile(currency.iso)">
        <span class="iso">{{currency.iso}}</span>
        <span>{{currency.name}}</span>
      </li>
    </ul>
  </main>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  definePageMeta({
    pagename: 'select currency',
    middleware: 'auth',
    layout: 'blank'
  })
  useHead({
    title: 'select currency'
  })

  const getPreferredCurrency = async () => {
    const { data, error } = await supabase
      .from('getUser')
      .select('currency')
      .eq('userId', user.value.id)
      .limit(1)
      .single()
    if(error) {
      return 'Not found'
    } else {
      return data.currency
    }
  }

  const currency = await getPreferredCurrency();
  const { data, error } = await supabase
    .from('sys_currencies')
    .select()
    .eq('enabled', true)
    .neq('iso', currency)
    
  const updateProfile = async (iso) => {
    const { error, data } = await pub(supabase, {
      sender:"pages/select/currency.vue"
    }).userPreferences({
      userId: user.value.id,
      currency: iso
    });
    if(error) {
      ok.log('error', 'failed updating currency: ', error)
    } else {
      navigateTo('/profile')
    }
  };
</script>
<style scoped lang="scss">
  main{
    max-width:$clamp-35;
    margin:0 auto;
  }
  ul{
    padding:$clamp $clamp-2;
  }
  li{
    display:grid;
    grid-template-columns: $clamp-4 4fr $clamp-3;
    border-bottom:$dark 1px solid;
    padding:$clamp $clamp-2;
    &:hover{
      cursor: pointer;
      background:white;
    }
  }
  .iso{
    font-family:"Kalt Monospace", monospace;
    font-size:75%;
  }
  span:hover{
    cursor:pointer;
  }
  /*
  .dark-mode li{
    border-color:$light;
    &:hover{
      background:$dark;
    }
  }
  */
</style>