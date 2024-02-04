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
  useHead({
    title: 'Payment method',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;
</script>