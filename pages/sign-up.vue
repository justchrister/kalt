<template>
  <div class="PageWrapper">
    <navbar :pageTitle="pagename" />
    <div class='page'>
      <div class="section">
        <div class="block">
          <h2 class="title">
            Create an account today, earn money tomorrow!
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
          <button type="submit">Sign up
          </button>
        </form>
        <div class="element link-group">
          <nuxt-link to="/sign-in">
            sign in
          </nuxt-link>
          <nuxt-link to="/forgot-password">
            forgot password
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

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

/*
  definePageMeta({
    middleware: ['auth']
  })

  onMounted(() => {
    watchEffect(() => {
      if (user.value) {
        navigateTo('/account/portfolio')
      }
    })
  })
*/
  const user = useSupabaseUser()
  const client = useSupabaseClient()

  const email = ref('')
  const password = ref('')

  const signUp = async () => {
    const { user, error } = await client.auth.signUp({
      email: email.value,
      password: password.value
    }) 
    if(!error){
      navigateTo('/lobby')
    } else {
      console.log(error)
    }
  }
</script>