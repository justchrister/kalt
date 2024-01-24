<template>
  <main>
    <navbar-breadcrumbs parent="profile"/>
    <block>
      <select-profile-picture />
      <input-user id="firstName"/>
      <input-user id="lastName"/>
      <select-country/>
      <input-user id="city"/>
      <input-user id="postalCode"/>
      <input-user id="addressLine1"/>
      <input-birthdate />
      <input-button link="/profile">done <omoji emoji="✔️" /></input-button>
    </block>
  </main>
</template>

<script setup lang="ts">
  definePageMeta({
    pagename: 'Edit',
    middleware: 'auth'
  })
  useHead({ title: 'Edit' })

  const supabase = useSupabaseClient();
  const auth = useSupabaseUser();
  const user = await get(supabase).user(auth.value) as user;

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