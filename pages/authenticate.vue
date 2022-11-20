<script setup lang="ts">
  const pagename = 'Authenticate';
  const title = 'Kalt — ' + pagename;
  const description = ref('My App Description')

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
  const email = ref('')
  const password = ref('')
  const isSignUp = ref(false)
  const errormsg = ref('')
  const signUp = async () => {
    const { user, error } = await client.auth.signUp({
      email: email.value,
      password: password.value
    })
  }

  const login = async () => {
    const { user, error } = await client.auth.signIn({
      email: email.value,
      password: password.value
    })
    if (error) {
      errormsg.value + error.message
      console.log(errormsg.value)
      console.log(errormsg)
    }
  }

  onMounted(() => {
    watchEffect(() => {
      if (user.value) {
        navigateTo('/profile')
      }
    })
  })

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
        <form @submit.prevent="() => (isSignUp ? signUp() : login())">
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
            <span v-if="isSignUp"> Sign up </span>
            <span v-else> Log in </span>
          </button>
        </form>
        <button @click="isSignUp = !isSignUp" class="underbutton">
          <span v-if="isSignUp"> Have an account? Log in instead </span>
          <span v-else> Create a new account </span>
        </button>
      </div>
    </div>
    <div class="notifications-box error" v-if="errormsg">Invalid login credentials</div>
  </div>
</template>