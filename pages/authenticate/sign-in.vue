<script setup lang="ts">
  const pagename = 'Sign in';
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
        navigateTo('/account/portfolio')
      }
    })
  })

  const email = ref('')
  const password = ref('')
  const isSignUp = ref(false)

  const signIn = async () => {
    const { user, error } = await client.auth.signIn({
      email: email.value,
      password: password.value
    })
    if (error.status = 400){
      errormsg.value = 'Please check login details'
    }
  }

</script>
<template>
  <div class="PageWrapper">
    <navbar :pageTitle="pagename" />
    <div class='page'>
      <div class="section">
        <div class="block">
          <h2 class="title">
            Welcome back! 😃
          </h2>
        </div>
        <form @submit.prevent="() => (signIn())">
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
          >
            Log in
          </button>
        </form>
        <nuxt-link to="/authenticate/sign-up">
          <button class="underbutton">
            Create a new account
          </button>
        </nuxt-link>
        <button @click="passwordReset()" class="underbutton">
          <span> Reset password </span>
        </button>
      </div>
    </div>
    <div class="notifications-box error" v-if="errormsg">{{errormsg}}</div>
  </div>
</template>