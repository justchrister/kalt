<template>
  <main>
    <navbar :pageTitle="pagename" />
    <div class="page">
      <div class="section">
        <navbar-tabs />
        <form @submit.prevent="updateProfile">
          <div class="col-2 gutter-right">
            <input-first-name :initial="data.first_name" :user_id="user.id"/>
          </div>
          <div class="col-2 gutter-left">
            <input-last-name :initial="data.last_name" :user_id="user.id"/>
          </div>
          <div class="col-3 gutter-right">
            <select-country :initial="data.country" :user_id="user.id"/>
          </div>
          <div class="col-3 gutter-horizontal">
            <input-city :initial="data.city" :user_id="user.id"/>
          </div>
          <div class="col-3 gutter-left">
            <input-postal-code :initial="data.postal_code" :user_id="user.id"/>
          </div>
          <input-address-line :initial="data.address_line" :user_id="user.id"/>
          <input-birthdate :initial="data.birthdate" :user_id="user.id"/>
          <div class="col-2 gutter-right">
            <select-preferred-currency :initial="data.preferred_currency" :user_id="user.id"/>
          </div>
          <div class="col-2 gutter-left">
            <select-preferred-language :initial="data.preferred_language" :user_id="user.id"/>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
  export default {
    name: 'PageHomepage',
  };
</script>

<script lang="ts" setup>
  const supabase = useSupabaseClient()
  const {data: {user}} = await supabase.auth.getUser()

  const pagename = 'Account';
  const title = 'Kalt — ' + pagename;
  useHead({
    title,
  });
  definePageMeta({
    middleware: 'auth'
  });

  const { data } = await supabase
  .from('accounts')
  .select()
  .single()
</script>
