<template>
  <main>
    <navbar-tabs />
    <block margin="half">
        <profile-card />
    </block>
    <block margin="half">
      <p>Settings</p>
      <select-currency />
      <select-language />
    </block>
    <block margin="half">
      <p>Preferences</p>
      <select-color-scheme />
      <select-auto-invest />
    </block>
    <block margin="half">
      <p>Legal</p>
      <toggle-performance />
      <toggle-emails />
      <toggle-terms-of-service />
    </block>
  </main>
</template>

<script lang="ts" setup>
  definePageMeta({
    pagename: 'Profile',
    middleware: 'auth'
  })
  useHead({
    title: 'Profile'
  })

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  
  const { data, error } = await supabase
    .from('get_user')
    .select()
    .limit(1)
    .single()
  if(error) ok.log('error', 'Could not get user account', error)
  if(data) ok.log('success', 'Got user object: ', data)
</script>
<style scoped lang="scss">
</style>