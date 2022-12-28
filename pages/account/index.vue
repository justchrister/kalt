<template>
  <div class="PageWrapper">
    <navbar :pageTitle="pagename" />
    <div class="page">
      <div class="section">
      <tabs />
        <div class="block">
          <form @submit.prevent="updateProfile">
            <div class="col-2 gutter-right">
              <input-first-name/>
            </div>
            <div class="col-2 gutter-left">
              <input-last-name/>
            </div>
            <div class="col-3 gutter-right">
              <select-country/>
            </div>
            <div class="col-3 gutter-horizontal">
              <input-city/>
            </div>
            <div class="col-3 gutter-left">
              <input-postal-code/>
            </div>
            <input-address-line/>
            <input-birthdate/>
            <div class="col-2 gutter-right">
              <select-preferred-currency/>
            </div>
            <div class="col-2 gutter-left">
              <select-preferred-language/>
            </div>
              <p> useful links: 
                <a href="#"> manage subscriptions </a>
                <nuxt-link to="/account/manage-cards" style="margin-left:15px;"> manage cards </nuxt-link>
                <a href="#" style="margin-left:15px;"> change password </a>
                <a href="#" style="margin-left:15px;"> change email </a>
                <nuxt-link to="/auth/sign-out" style="margin-left:15px;"> sign out 👋 </nuxt-link>
              </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'PageHomepage',
  };
</script>

<script lang="ts" setup>
  const pagename = 'Account';
  const title = 'Kalt — ' + pagename;
  useHead({
    title,
  });

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  definePageMeta({
    middleware: ['auth']
  })

  onMounted(() => {
    watchEffect(() => {
      if (!user.value) {
        navigateTo('/auth')
      }
    })
  })
</script>
