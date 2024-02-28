<template>
  <main>
    <block>
      <h1> How would you like to invest?</h1>
      <payment-method-add :user="user" button-label="build your fund ->" submit-redirect="/funds/your"/>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Payment method',
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
</script>