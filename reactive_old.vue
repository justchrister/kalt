<template>
  <div class="PageWrapper">
    <navbar :pageTitle="pagename" />
    <div class="page">
      <div class="section">
        <div class="block">
          <form @submit.prevent="updateProfile">
            <fullname :data="form.data" />
            <!--
            <email :data="form.data" />
            <username :data="form.data" />
            <Address :data="form.data" />
            <AutoInvest :value="auto_invest" />-->
            <!--Birthdate-->
            <Submit data="submit!"/>
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

import Navbar from '@/design-system/components/navbar.vue';
import fullname from '@/design-system/components/fullname.vue';
import Email from '@/design-system/components/Email.vue';
import username from '@/design-system/components/username.vue';
import Address from '@/design-system/components/address.vue';
import Submit from '@/design-system/components/Submit.vue';
import { createClient } from '@supabase/supabase-js'
const client = createClient('https://urgitfsodtrsbtcbwnpv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyZ2l0ZnNvZHRyc2J0Y2J3bnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkzODQ0MjAsImV4cCI6MTk4NDk2MDQyMH0.l9JEhyEnQ8ILtdJ3mUrCYtWm_Sx6eXHUGNQ8FnSF0yw')

  const pagename = "Account";
  const title = "Kalt — " + pagename;
  const description = ref("My App Description");

  useHead({
    title,
    meta: [
      {
        name: "description",
        content: description,
      },
    ],
  }); 

  const form = reactive({
    data: {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      country: '',
      city: '',
      postal_code: '',
      address_line: '',
    },
  });
/*
  form.data.username = "justchrister";
  form.data.first_name = "christer";
  form.data.last_name = "christer";
  form.data.email = 'email@mail.no';
  form.data.country = 'no';
  form.data.city = 'oslo';
  form.data.postal_code = '2024';
  form.data.address_line = 'something';

  const { data: profile } = await useAsyncData("accounts", async () => {
    loading.value = true;
    const { data } = await client
      .from("accounts")
      .select("*")
      .eq("user_id", user.value.id)
      .single();
    loading.value = false;
    return data;
  });

  //const { data: profile } = await useAsyncData("accounts", async () => {
  // data fetching
  //});

  //if (profile.value.first_name) {
  //  first_name.value = profile.value.first_name;
  //}
  //if (profile.value.last_name) {
  //  last_name.value = profile.value.last_name;
  //}

  const updateProfile = async () => {
    form.data.first_name = "lol";
  }
  */
</script>
