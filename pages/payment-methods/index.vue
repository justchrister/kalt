<template>
  <main>
    <block>
      <stripe-elements-default-payment-method :user="user" />
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'page',
    middleware: 'auth'
  })
  useHead({
    title: 'page',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })

  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;
  const defaultPaymentMethod = await get(supabase).defaultPaymentMethod(user);
  ok.log('', defaultPaymentMethod)
  </script>
<style scoped lang="scss"></style>