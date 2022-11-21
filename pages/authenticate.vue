<script setup lang="ts">
  const pagename = 'Authenticate';
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
    if (error.status = 400){
      errormsg.value = 'Please check login details'
    }
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
    <div class="notifications-box error" v-if="errormsg">{{errormsg}}</div>
  </div>
</template>