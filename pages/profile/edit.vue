<template>
  <main>
    <navbar-breadcrumbs parent="profile"/>
    <block>
      <form @submit.prevent="updateProfile">
        <input-first-name :initial="data.first_name" :user_id="user.id"/>
        <input-last-name :initial="data.last_name" :user_id="user.id"/>
        <input-country :initial="data.country" :user_id="user.id"/>
        <input-city :initial="data.city" :user_id="user.id"/>
        <input-postal-code :initial="data.postal_code" :user_id="user.id"/>
        <input-address-line :initial="data.address_line_1" :user_id="user.id"/>
        <input-birthdate :initial="data.birthdate" :user_id="user.id"/>
      </form>
    </block>
  </main>
</template>

<script setup>
  definePageMeta({
    pagename: 'Edit',
    middleware: 'auth'
  })
  useHead({
    title: 'Edit'
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
  .grid-col-2{
    grid-template-columns: 1fr 1fr;
  }
  .grid-col-3{
    grid-template-columns: 1fr 1fr 1fr; 
  }
</style>