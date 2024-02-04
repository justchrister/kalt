<template>
  <main>
    <block>
      <input-birthdate-day :user="user" />
      <input-button link="/profile/"> done </input-button>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Birthdate',
    middleware: 'auth'
  })
  useHead({
    title: 'Birthdate',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
  
  const supabase = useSupabaseClient();
  const auth = useSupabaseUser();
  const user = await get(supabase).user(auth.value);
  
</script>
<style scoped lang="scss">
  
</style>