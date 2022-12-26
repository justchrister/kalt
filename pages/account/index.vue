<template>
  <div class="PageWrapper">
    <navbar :pageTitle="pagename" />
    <div class="page">
      <div class="section">
      <tabs />
        <div class="block">
          <form @submit.prevent="updateProfile">
            <dds-name :data="form.data" />
            <dds-address :data="form.data" />
            <div class="col-2 gutter-right">
            <dds-email :data="form.data" />
            </div>
            <div class="col-2 gutter-left">
            <dds-username :data="form.data" />
            </div>
            <div class="col-2 gutter-right">
            <dds-user-currency :data="form.data" />
            </div>
            <div class="col-2 gutter-left">
            <dds-user-language :data="form.data" />
            </div>
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

  const first_name = ref('')
  const last_name = ref('')
  const country = ref('')
  const city = ref('')
  const address_line = ref('')
  const postal_code = ref('')
  const username = ref('')
  const email = ref('')
  const currency = ref('')
  const language = ref('')

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
  console.log(form.data)
/*

  const supabase = useSupabaseClient()
  const user = useSupabaseUser();

  const { data: profile } = await useAsyncData("accounts", async () => {
    const { data, error } = await client
      .from("accounts")
      .select()
      .single();
      console.log(error)
    return data;
  });


*/
  const supabase = useSupabaseClient()
  const user = useSupabaseUser();

  let { data } = await supabase
      .from('accounts')
      .select()
      .eq('user_id', user.value.id)
      .single()
  if(data && username.user_id != ''){
    form.data.first_name = data.first_name
    form.data.last_name = data.last_name
    form.data.country = data.country
    form.data.city = data.city
    form.data.address_line = data.address_line
    form.data.postal_code = data.postal_code
    form.data.username = data.username
    form.data.email = data.email
    form.data.currency = data.currency
    form.data.language = data.language
  }
  const updateProfile = async () => {

  form.data.country = "netherlands"
    try {
      const updates = {
        first_name: form.data.first_name,
        last_name: form.data.last_name,
        country: form.data.country,
        city: form.data.city,
        postal_code: form.data.postal_code,
        address_line: form.data.address_line,
        username: form.data.username,
        preferred_currency: form.data.currency,
        preferred_language: form.data.language,
        modified_at: new Date(),
      };
      const { error } = await supabase
        .from("accounts")
        .update(updates)
        .eq("user_id", user.value.id)
    } catch (error) {
      console.log(error)
    } finally {
      console.log(form.data.country)
    }
  };
</script>
