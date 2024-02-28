<template>
  <main>
    <block>
      <h1> Which city <span v-if="country.name">in {{ country.name }}</span> do you live in?</h1>
      <form @submit.prevent="navigateTo('/invite/accept/address')">
        <input-user :user="user" id="city" />
        <input-button>next →</input-button>
      </form>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'City',
    middleware: 'auth'
  })
  useSeoMeta({
    title: 'Accept invite',
    ogTitle: 'Kalt - Accept invite',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta.png'
  })
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;
  const { data: country, error } = await supabase
    .from('sys_countries')
    .select()
    .eq('iso2', user.country)
    .limit(1)
    .single()
</script>