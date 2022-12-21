<script setup lang="ts">
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
onMounted(() => {
  watchEffect(() => {
    if (!user.value) {
      navigateTo('/authenticate/sign-in')
    }
  });
});
// need error handling here

  
const client = useSupabaseClient();
const user = useSupabaseUser();
const loading = ref(true);
const first_name = ref("");
const last_name = ref("");
const username = ref("");
const birthdate = ref("");
const country = ref("");
const city = ref("");
const postal_code = ref("");
const auto_invest = ref("");
const address_line_1 = ref("");
const address_line_2 = ref("");

const { data: profile } = await useAsyncData("accounts", async () => {
  loading.value = true;
  const { data } = await client
    .from("accounts")
    .select("first_name, last_name, username, birthdate, country, city, postal_code, address_line_1, address_line_2, auto_invest")
    .eq("user_id", user.value.id)
    .single();
  loading.value = false;
  return data;
});


if (profile.value.first_name) {
  first_name.value = profile.value.first_name;
}
if (profile.value.last_name) {
  last_name.value = profile.value.last_name;
}
if (profile.value.username) {
  username.value = profile.value.username;
}
if (profile.value.birthdate) {
  birthdate.value = profile.value.birthdate;
}
if (profile.value.country) {
  country.value = profile.value.country;
}
if (profile.value.city) {
  city.value = profile.value.city;
}
if (profile.value.postal_code) {
  postal_code.value = profile.value.postal_code;
}
if (profile.value.address_line_1) {
  address_line_1.value = profile.value.address_line_1;
}
if (profile.value.address_line_2) {
  address_line_2.value = profile.value.address_line_2;
}
if (profile.value.auto_invest) {
  auto_invest.value = profile.value.auto_invest;
}

async function updateProfile() {
  try {
    loading.value = true;
    const updates = {
      first_name: first_name.value,
      last_name: last_name.value,
      username: username.value,
      birthdate: birthdate.value,
      country: country.value,
      city: city.value,
      postal_code: postal_code.value,
      address_line_1: address_line_1.value,
      address_line_2: address_line_2.value,
      auto_invest: auto_invest.value,
      modified_at: new Date(),
    };
    const { error } = await client
      .from("accounts")
      .update(updates)
      .eq("user_id", user.value.id);
  } catch (error) {
    console.log(error);
    if (error){
      console.log("its an error")
    }
  } finally {
    loading.value = false;
  }
}

async function signOut() {
  try {
    loading.value = true;
    let { error } = await client.auth.signOut();
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}
console.log(first_name)
</script>
<template>
  <div class="PageWrapper">
    <navbar :pageTitle="pagename" />
    <div class="page">
      <div class="section">
        <kaltheader/>
        <div class="block">
          <form @submit.prevent="updateProfile">
            <Email      :value="user.email" />
            <Username   :value="username" />
            <Name       :value="[first_name, last_name]" />
            <!--<Birthdate  :value="birthdate" />-->
            <Address    :value="[country, city, postal_code, address_line_1, address_line_2]" />
            <!--<AutoInvest :value="auto_invest" />-->
            <!--<Submit />-->
          </form>
          <button type="button" class="underbutton" @click="signOut">
            sign out 👋
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>