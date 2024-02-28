<template>
  <main>
    <block>
      <add-payment-method :user="user" />
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Payment method',
    middleware: 'auth'
  })
  
  useSeoMeta({
    title: 'Payment method',
    ogTitle: 'Kalt - Payment method',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta.png'
  })
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;

</script>