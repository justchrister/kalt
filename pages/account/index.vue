<template>
  <main>
    <navbar-tabs />
    <div class="block">
      <form @submit.prevent="updateProfile">
        <div class="grid-col-2">
          <input-first-name :initial="data.first_name" :user_id="user.id"/>
          <input-last-name :initial="data.last_name" :user_id="user.id"/>
        </div>
        <div class="grid-col-3">
          <select-country :initial="data.country" :user_id="user.id"/>
          <input-city :initial="data.city" :user_id="user.id"/>
          <input-postal-code :initial="data.postal_code" :user_id="user.id"/>
        </div>
        <input-address-line :initial="data.address_line" :user_id="user.id"/>
        <input-birthdate :initial="data.birthdate" :user_id="user.id"/>
        <div class="grid-col-2">
          <select-preferred-currency :initial="data.preferred_currency" :user_id="user.id"/>
          <select-preferred-language :initial="data.preferred_language" :user_id="user.id"/>
        </div>
        <toggle-terms-of-service />
        <toggle-marketing />
      </form>
    </div>
  </main>
</template>

<script lang="ts" setup>
  definePageMeta({
    pagename: 'Account',
    middleware: 'auth'
  })
  useHead({
    title: 'Kalt — Account',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const { data, error } = await supabase
    .from('accounts')
    .select()
    .single()
  if(error) oklog("error", "Could not get user account")
</script>
