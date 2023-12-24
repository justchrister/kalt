<template>
  <main>
    <navbar-breadcrumbs parent="profile"/>
    <block>
      <form @submit.prevent="updateProfile">
        <select-profile-picture />
        <input-user :initial="initial.firstName" id="firstName"/>
        <input-user :initial="initial.lastName" id="lastName"/>
        <select-country/>
        <input-user :initial="initial.city" id="city"/>
        <input-user :initial="initial.postalCode" id="postalCode"/>
        <input-user :initial="initial.addressLine1" id="addressLine1"/>
        <input-birthdate :initial="initial.birthdate" :userId="user.id"/>
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
  const userId = useSupabaseUser()
  const user = await get(supabase).user(userId.value.id)
  const initial = {
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    city: user.city || '',
    postalCode: user.postalCode || '',
    addressLine1: user.addressLine1 || '',
    birthdate: user.birthdate || ''
  }
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