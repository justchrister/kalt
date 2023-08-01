<template>
  <main>
    <ul>
      <span @click="navigateTo('/profile')">← back</span>
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
    middleware: ['default', 'auth'],
    layout: 'blank'
  })
  useHead({
    title: 'select language'
  })

  const getPreferredLanguage = async () => {
    const { data, error } = await supabase
      .from('getUser')
      .select('language')
      .eq('userId', user.value.id)
      .limit(1)
      .single()
    return data.language
  }

  const language = await getPreferredLanguage();
  const { data, error } = await supabase
    .from('sys_languages')
    .select()
    .eq('enabled', true)
    .neq('iso', language)
  if(error)ok.log('error', 'could not get languages', error)

  const updateProfile = async (iso) => {
    const { error, data } = await pub(supabase, {"sender":"pages/select/language.vue"}).userPreferences({
      userId: user.value.id,
      language: iso
    });
    if(error) {
      ok.log('error', 'failed updating language: ', error)
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
  /*
  .dark-mode li{
    border-color:$light;
    &:hover{
      background:$dark;
    }
  }
  */
</style>