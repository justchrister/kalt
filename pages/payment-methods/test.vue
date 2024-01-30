<template>
  <main>

  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Page',
    middleware: 'auth'
  })
  useHead({
    title: 'Page',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value)
  const setupIntent = await get(supabase).setupIntent(user);
  ok.log('', setupIntent)
</script>
<style scoped lang="scss"></style>