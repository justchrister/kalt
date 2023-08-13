<template>
  <main>
    <navbar-breadcrumbs parent="profile"/>
    <block>
      <form @submit.prevent="updateProfile">
        <select-profile-picture />
        <input-first-name :initial="initial.firstName" :userId="user.id"/>
        <input-last-name :initial="initial.lastName" :userId="user.id"/>
        <select-country/>
        <input-city :initial="initial.city" :userId="user.id"/>
        <input-postal-code :initial="initial.postalCode" :userId="user.id"/>
        <input-address-line :initial="initial.addressLine1" :userId="user.id"/>
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
  const user = useSupabaseUser()

  const getInitialValues = async () => {
    const { data, error } = await supabase
      .from('getUser')
      .select()
      .limit(1)
      .single() 
    if(data){
      return {
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        city: data.city || '',
        postalCode: data.postalCode || '',
        addressLine1: data.addressLine1 || '',
        birthdate: data.birthdate || ''
      }
    } else {
      return {
        firstName: '',
        lastName: '',
        city: '',
        postalCode: '',
        addressLine1: '',
        birthdate: ''
      }
    }
  }
  const initial = await getInitialValues();
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