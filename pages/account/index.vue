<template>
  <div class="PageWrapper">
    <navbar :pageTitle="pagename" />
    <div class="page">
      <div class="section">
        <div class="block">
        <tabs />
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
  
</script>
