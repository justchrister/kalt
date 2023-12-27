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
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
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
    const error = await pub(supabase, {
      sender:"pages/select/language.vue",
      entity: auth.value.id
    }).users({
      userId: auth.value.id,
      language: iso
    });
    if(error) {
      ok.log('error', 'failed updating language: ', error)
    } else {
      await ok.sleep(200);
      navigateTo('/profile')
    }
  };
</script>
<style scoped lang="scss">

.icon{
    float:right;
  }
  main{
    max-width: sizer(35);
    margin:0 auto;
  }
  ul{
    padding: sizer(1) sizer(2);
  }
  li{
    display:grid;
    grid-template-columns: sizer(4) 4fr ;
    padding: sizer(1) sizer(2);
    margin: sizer(1) 0;
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
  span:hover{
    cursor:pointer;
  }
</style>