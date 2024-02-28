<template>
  <main>
    <block>
      <form @submit.prevent="navigateTo('/profile/edit/birthdate/month')">
        <input-birthdate-year :user="user" />
        <input-button> set month -> </input-button>
      </form>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Birthdate',
    middleware: 'auth'
  })
  
  useSeoMeta({
    title: 'Birthdate',
    ogTitle: 'Kalt - Birthdate',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta.png'
  })
  
  const supabase = useSupabaseClient();
  const auth = useSupabaseUser();
  const user = await get(supabase).user(auth.value);
  
</script>
<style scoped lang="scss">
  
</style>