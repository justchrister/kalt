<template>
  <main>
    <navbar-breadcrumbs parent="profile"/>
    <block>
      <form @submit.prevent="updateProfile">
        <select-profile-picture />
        <input-first-name :initial="data.firstName" :userId="user.id"/>
        <input-last-name :initial="data.lastName" :userId="user.id"/>
        <input-country :initial="data.country" :userId="user.id"/>
        <input-city :initial="data.city" :userId="user.id"/>
        <input-postal-code :initial="data.postalCode" :userId="user.id"/>
        <input-address-line :initial="data.address_line_1" :userId="user.id"/>
        <input-birthdate :initial="data.birthdate" :userId="user.id"/>
      </form>
    </block>
  </main>
</template>

<script setup>
  definePageMeta({
    pagename: 'Edit',
    middleware: ['default', 'auth']
  })
  useHead({
    title: 'Edit'
  })

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  
  const { data, error } = await supabase
    .from('getUser')
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
  .grid-col-2{
    grid-template-columns: 1fr 1fr;
  }
  .grid-col-3{
    grid-template-columns: 1fr 1fr 1fr; 
  }
</style>