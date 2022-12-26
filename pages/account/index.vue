<template>
  <div class="PageWrapper">
    <navbar :pageTitle="pagename" />
    <div class="page">
      <div class="section">
        <div class="block">
          <form @submit.prevent="updateProfile">
            <dds-name :data="form.data" />
            <dds-address :data="form.data" />
            <dds-username :data="form.data" />
            <dds-email :data="form.data" />
            <dds-user-currency :data="form.data" />
            <dds-user-language :data="form.data" />
            <!--<dds-user-birthdate :data="form.data" />-->
            <input type="submit" value="Update">
          </form>
          <button type="button" class="underbutton">
            sign out 👋
          </button>
          <p> missing from this page: </p>
          <ul>
            <li> Menubar </li>
            <li> Link to sign out </li>
            <li> Link to manage cards </li>
            <li> Link to manage subscriptions </li>
          </ul>
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
  import { createClient } from '@supabase/supabase-js'
  const runtimeConfig = useRuntimeConfig()
  const supabase = createClient(runtimeConfig.supabaseUrl, runtimeConfig.supabaseSecret)
  const { data: { user } } = await supabase.auth.getUser()
  
  
  const form = reactive({
    data: {
      first_name: '',
      last_name: '',
      country: '',
      city: '',
      address_line: '',
      postal_code: '',
      username: '',
      email: '',
      currency: '',
      language: '',
    },
  });
  const updateProfile = async () => {
    form.data.first_name = "lol";
    /*
    try {
      const updates = {
        first_name: form.data.first_name,
        last_name: form.data.last_name,
        username: form.data.username,
        country: form.data.country,
        city: form.data.city,
        address_line: form.data.address_line,
        default_currency: form.data.currency,
        modified_at: new Date(),
      };
      const { error } = await supabase
        .from("accounts")
        .update(updates)
        .eq("user_id", user.id)
    } catch (error) {
      console.log(error)
    } finally {
    }*/
  };
</script>
