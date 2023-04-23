<template>
  <main>
    <ul>
      <span @click="goBack()">← back</span>
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
    layout: 'whitepaper'
  })
  useHead({
    title: 'select currency',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })

  const router = useRouter()
  const goBack = () => {
    router.go(-1)
  }
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
  const { data, error } = await supabase
    .from('currencies')
    .select()
    .eq('enabled', true)
    .neq('iso', currency)
    
  const updateProfile = async (iso) => {
    const { error } = await supabase
      .from('user_preferences')
      .insert({ 
        user_id: user.value.id,
        currency: iso, 
        message_entity_id: user.value.id,
        message_sender: 'pages/select/currency.vue' 
      })
    if(error) ok.log('error', 'failed updating currency: ', error)
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
    padding-bottom:$clamp;
    margin:$clamp 0;
  }
  .iso{
    font-family:"Kalt Monospace", monospace;
    font-size:75%;
  }
</style>