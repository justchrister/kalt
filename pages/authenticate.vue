<script setup lang="ts">

  definePageMeta({
    middleware: ['auth']
  })

  const user = useSupabaseUser()
  const client = useSupabaseClient()
  const email = ref('')
  const password = ref('')
  const isSignUp = ref(false)

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
    if (error.status) {
      console.log(error)
    }
  }

  onMounted(() => {
    watchEffect(() => {
      if (user.value) {
        navigateTo('/invest')
      }
    })
  })

</script>
<template>
  <div class="PageWrapper">
    <Kaltmenu pageTitle="Homepage" />
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
        <button
          @click="isSignUp = !isSignUp"
          class="underbutton"
        >
          <span v-if="isSignUp"> Have an account? Log in instead </span>
          <span v-else> Create a new account </span>
        </button>
      </div>
    </div>
    <div class="notification"></div>
  </div>
</template>
<style scoped>
.underbutton{
  border:none;
  font-size:70%;
  text-decoration: underline;
}
.underbutton:focus,
.underbutton:active{
  background:transparent;
}
</style>