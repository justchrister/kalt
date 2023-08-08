<template>
  <main>
    <ul>
      <span @click="navigateTo('/profile')">← back</span>
      <li v-for="country of data" :value="country.iso" :key="country.iso" @click="updateProfile(country.iso2)">
        <span class="iso">{{country.iso2}}</span>
        <span>{{country.name}}</span>
      </li>
    </ul>
  </main>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  definePageMeta({
    pagename: 'select country',
    middleware: 'auth',
    layout: 'blank'
  })
  useHead({
    title: 'select country'
  })

  const { data, error } = await supabase
    .from('sys_countries')
    .select()
    .eq('enabled', true)
    
  const updateProfile = async (iso) => {
    const { error, data } = await pub(supabase, {
      sender:"pages/select/country.vue"
    }).userDetails({
      userId: user.value.id,
      country: iso
    });
    if(error) {
      ok.log('error', 'failed updating country: ', error)
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
</style>