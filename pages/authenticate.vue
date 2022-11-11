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
    //const { user, error } = await supabase.from('userProfiles').insert({'user_id': user.value.id});
    //const { user, error } = await supabase.from('KYC').insert({'user_id': user.value.id});
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
            Time to start building your residual income!!
          </h2>
        </div>
        <form @submit.prevent="() => (isSignUp ? signUp() : login())">
          <input
            type="email"
            placeholder="Email"
            v-model="email"
          />
          <input
            type="password"
            placeholder="Password"
            v-model="password"
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