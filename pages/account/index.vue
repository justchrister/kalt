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

//import charts = module('highcharts');

// Redirect if user is not logged in
definePageMeta({
  title: "Articles",
  middleware: ["auth"],
});
onMounted(() => {
  watchEffect(() => {
    if (!user.value) {
      navigateTo('/authenticate/sign-in')
    }
  });
});
// need error handling here

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
console.log(auto_invest.value)
</script>
<template>
  <div class="PageWrapper">
    <Kaltmenu :pageTitle="pagename" />
    <div class="page">
      <div class="section">
        <kaltheader :first_name="first_name" :last_name="last_name" />
        <div class="block">
          <form @submit.prevent="updateProfile">

            <label for="email">Email</label>
            <input id="email" type="text" :value="user.email" disabled />

            <label for="username">Username</label>
            <input id="username" type="text" v-model="username" />
<br/><br/>
            <label for="first-name">First name</label>
            <input id="first-name" type="text" v-model="first_name" />

            <label for="first-name">Last name</label>
            <input id="first-name" type="text" v-model="last_name" />
<br/><br/>
            <button> verify your identity </button>
<br/><br/>
            <label for="birthdate">Birthdate</label>
            <input id="birthdate" type="date" v-model="birthdate" />
<br/><br/>   <!-- https://bluzky.github.io/nice-select2/ -->
            <label for="country">Country</label>
            <input id="country" type="text" v-model="country" />

            <label for="city">City</label>
            <input id="city" type="text" v-model="city" />

            <label for="postal_code">Postal code</label>
            <input id="postal_code" type="number" v-model="postal_code" />

            <label for="address_line_1">Address line 1</label>
            <input id="address_line_1" type="text" v-model="address_line_1" />

            <label for="address_line_2">Address line 2</label>
            <input id="address_line_2" type="text" v-model="address_line_2" />

            <label class="switch">
              <input type="checkbox" id="auto_invest" v-model="auto_invest"  name="auto_invest" checked />
              <span class="slider round"></span>
            </label>
            <label for="auto_invest">
              Automatically invest available funds
            </label>

            <input type="submit" value="update" />

            <button type="button" class="underbutton" @click="signOut">
              sign out 👋
            </button>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

</style>