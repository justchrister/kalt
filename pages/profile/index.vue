<template>
  <main>
    <navbar-tabs />
    <block>
      <form @submit.prevent="updateProfile">
        <div class="grid-col-2">
          <input-first-name :initial="data.first_name" :user_id="user.id"/>
          <input-last-name :initial="data.last_name" :user_id="user.id"/>
        </div>
        <div class="grid-col-3">
          <input-country :initial="data.country" :user_id="user.id"/>
          <input-city :initial="data.city" :user_id="user.id"/>
          <input-postal-code :initial="data.postal_code" :user_id="user.id"/>
        </div>
        <input-address-line :initial="data.address_line_1" :user_id="user.id"/>
        <input-birthdate :initial="data.birthdate" :user_id="user.id"/>
        <div class="grid-col-2">
          <input-preferred-currency :initial="data.currency" :user_id="user.id"/>
          <input-preferred-language :initial="data.language" :user_id="user.id"/>
        </div>
        <toggle-terms-of-service />
        <toggle-marketing />
      </form>
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
  .grid-col-2{
    grid-template-columns: 1fr 1fr;
  }
  .grid-col-3{
    grid-template-columns: 1fr 1fr 1fr; 
  }
</style>