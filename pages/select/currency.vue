<template>
  <main>
    <ul>
      <span @click="navigateTo('/profile')">← back</span>
      <li v-for="currency of data" :value="currency.iso" :key="currency.iso" @click="updateProfile(currency.iso)">
        <span class="iso">{{currency.iso}}</span>
        <span>{{currency.name}}
          <span class="icon" v-if="selected==currency.iso"><loading-icon /></span>
        </span>
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

  const { data, error } = await supabase
    .from('sys_currencies')
    .select()
    .eq('enabled', true)
  const selected = ref();

  const updateProfile = async (iso) => {
    selected.value = iso;
    const { error } = await pub(supabase, {
      sender:"pages/select/currency.vue",
      entity: user.value.id
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
  span:hover{
    cursor:pointer;
  }
</style>