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
const birthdate = ref("");
const last_name = ref("");
const country = ref("");
const city = ref("");

//import charts = module('highcharts');

// Redirect if user is not logged in
definePageMeta({
  title: "Articles",
  middleware: ["auth"],
});
onMounted(() => {
  watchEffect(() => {
    if (!user.value) {
      navigateTo("/authenticate");
    }
  });
});
// need error handling here

const { data: profile } = await useAsyncData("profiles", async () => {
  loading.value = true;
  const { data } = await client
    .from("profiles")
    .select("first_name, last_name, birthdate")
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

if (profile.value.birthdate) {
  birthdate.value = profile.value.birthdate;
}

async function updateProfile() {
  try {
    loading.value = true;
    const updates = {
      first_name: first_name.value,
      last_name: last_name.value,
      birthdate: birthdate.value,
      updated_at: new Date(),
    };
    const { error } = await client
      .from("profiles")
      .update(updates)
      .eq("user_id", user.value.id);
  } catch (error) {
    console.log(error);
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
            <label for="first-name">First name</label>
            <input id="first-name" type="text" v-model="first_name" />
            <label for="first-name">Last name</label>
            <input id="first-name" type="text" v-model="last_name" />
            <label for="birthdate">Birthdate</label>
            <input id="birthdate" type="date" v-model="birthdate" />
            <label for="country">Country</label>
            <input id="country" type="text" v-model="country" />
            <label for="city">City</label>
            <input id="city" type="text" v-model="city" />
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