<template>
  <main>
    <ul>
      <span @click="goBack()">← back</span>
      <li v-for="language of data" :value="language.iso" :key="language.iso" @click="updateProfile(language.iso)">
        <span class="iso">{{language.iso}}</span>
        <span>{{language.name}}</span>
      </li>
    </ul>
  </main>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  definePageMeta({
    middleware: 'auth',
    layout: 'whitepaper'
  })
  useHead({
    title: 'select language',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })

  const router = useRouter()
  const goBack = () => { router.go(-1) }
  const getPreferredLanguage = async () => {
    const { data, error } = await supabase
      .from('get_user')
      .select('language')
      .eq('user_id', user.value.id)
      .limit(1)
      .single()
    return data.language
  }

  const language = await getPreferredLanguage();
  const { data, error } = await supabase
    .from('languages')
    .select()
    .eq('enabled', true)
    .neq('iso', language)
  if(error)ok.log('error', 'could not get languages', error)
    
  const updateProfile = async (iso) => {
    const { error } = await supabase
      .from('user_preferences')
      .insert({ 
        user_id: user.value.id,
        language: iso,
        message_sender: 'pages/select/language.vue' 
      })
    if(error) {
      ok.log('error', 'failed updating currency: ', error)
    } else {
      goBack()
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
</style>