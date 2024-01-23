<template>
  <main>
    <block>
      <stripe-elements-payment :user="user" />
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
  const user = await get(supabase).user(auth)
  
</script>
<style scoped lang="scss">
  
</style>