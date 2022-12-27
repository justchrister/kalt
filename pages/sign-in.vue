
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
          <div class="element input password">
            <label class="atom" for='password'> Password </label>
            <input class="atom" 
              type="password"
              placeholder="Password"
              v-model="password"
              id='password'
            />
          </div>
          <input type="submit" value="Sign in" class="atom">
        </form>
        <div class="element link-group">
          <nuxt-link to="/sign-up">Sign up</nuxt-link>
          <nuxt-link to="/forgot-password">Forgot password</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const pagename = 'Sign up';
  const title = 'Kalt — ' + pagename;
  const description = ref('My App Description')

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

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

  onMounted(() => {
    watchEffect(() => {
      if (user.value) {
        navigateTo('/account/portfolio')
      }
    })
  })

  const email = ref('')
  const password = ref('')

  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })
    if (error.status = 400){
      console.log('Please check login details')
    }
  }
</script>