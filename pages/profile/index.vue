<template>
  <main>
    <navbar-tabs />
    <block margin="half">
      <profile-card />
    </block>
    <block margin="half">
      <div class="section">
        <p>Settings</p>
        <div>
          <select-currency />
          <select-language />
        </div>
      </div>
      <div class="section">
        <p>Preferences</p>
        <div>
          <select-currency />
          <select-language />
        </div>
      </div>
      <div class="section">
        <p>Legal</p>
        <div>
          <select-currency />
          <select-language />
        </div>
      </div>
    </block>
  </main>
</template>

<script lang="ts" setup>
  definePageMeta({
    pagename: 'Profile',
    middleware: 'auth'
  })
  useHead({
    title: 'Profile',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  
  const { data, error } = await supabase
    .from('get_user')
    .select()
    .limit(1)
    .single()
  if(error) ok.log("error", "Could not get user account", error)
  if(data) ok.log('success', 'Got user object: ', data)
</script>
<style scoped lang="scss">
  .grid-col-3,
  .grid-col-2{
    display: grid;
    grid-template-rows: 1fr;
    gap: 2% 2%;
    grid-auto-flow: row;
  }
  .section{
    display:grid;
    grid-gap: $clamp;
    grid-template-columns: $clamp-10 4fr;
    margin-bottom: $clamp-2;
  }
</style>