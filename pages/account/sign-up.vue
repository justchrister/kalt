<script setup lang="ts">
  const pagename = 'Sign up';
  const title = 'Kalt — ' + pagename;
  const description = ref('My App Description')
  var errormsg = ref('');

  useHead({
    title,
    meta: [
      {
        name: "description",
        content: description,
      },
    ],
  });
  
  definePageMeta({
    middleware: ['auth']
  })

  const user = useSupabaseUser()
  const client = useSupabaseClient()

  onMounted(() => {
    watchEffect(() => {
      if (user.value) {
        navigateTo('/portfolio')
      }
    })
  })

  const email = ref('')
  const password = ref('')

  const signUp = async () => {
    const { user, error } = await client.auth.signUp({
      email: email.value,
      password: password.value
    })
  }
</script>
<template>
  <div class="PageWrapper">
    <Kaltmenu :pageTitle="pagename" />
    <div class='page'>
      <div class="section">
        <div class="block">
          <h2 class="title">
            Log in or register now 😃
          </h2>
        </div>
        <form @submit.prevent="() => (signUp())">
          <label  for='email'> E-mail</label>
          <input
            type="email"
            placeholder="Email"
            v-model="email"
            id='email'
          />
          <label for='password'> Password </label>
          <input
            type="password"
            placeholder="Password"
            v-model="password"
            id='password'
          />
          <button
            type="submit"
          >Sign up
          </button>
        </form>
        <button class="underbutton">
          <span> Have an account? Log in instead </span>
        </button>
      </div>
    </div>
    <div class="notifications-box error" v-if="errormsg">{{errormsg}}</div>
  </div>
</template>