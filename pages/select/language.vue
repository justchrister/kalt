<template>
  <main>
    <ul>
      <span @click="navigateTo('/profile')">← back</span>
      <li v-for="language of data" :value="language.iso" :key="language.iso" @click="updateProfile(language.iso)">
        <span class="iso">{{language.iso}}</span>
        <span>
          {{language.name}}
          <span class="icon" v-if="selected==language.iso"><loading-icon /></span>
        </span>
      </li>
    </ul>
  </main>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const userId = useSupabaseUser()
  definePageMeta({
    middleware: 'auth',
    layout: 'blank'
  })
  useHead({
    title: 'select language'
  })

  const { data, error } = await supabase
    .from('sys_languages')
    .select()
    .eq('available', true)
  if(error)ok.log('error', 'could not get languages', error)
  const selected = ref();
  const updateProfile = async (iso) => {
    selected.value = iso;
    const { error, data } = await pub(supabase, {
      sender:"pages/select/language.vue",
      entity: userId.value.id
    }).users({
      userId: userId.value.id,
      language: iso
    });
    if(error) {
      ok.log('error', 'failed updating language: ', error)
    } else {
      navigateTo('/success/profile')
    }
  };
</script>
<style scoped lang="scss">
  .icon{
    float:right;
  }
  main{
    max-width:$clamp-35;
    margin:0 auto;
  }
  ul{
    padding:$clamp $clamp-2;
  }
  li{
    display:grid;
    grid-template-columns: $clamp-4 4fr;
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