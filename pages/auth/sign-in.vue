
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
  const pagename = 'Sign in';
  const title = 'Kalt — ' + pagename;
  const description = ref('My App Description')

  const user = useSupabaseUser()
  const supabase = useSupabaseClient()
  const router = useRouter()

  useHead({
    title,
    meta: [
      {
        name: "description",
        content: description,
      },
    ],
  });


  const email = ref('')
  const password = ref('')

  // Login method using providers
  const signIn = async () => {
    const { data, error } = await supabase.auth.signIn({ 
      email: email.value,
      password: password.value
     })
    if (error) {
      return alert('Something went wrong !')
    }
    router.push('/account/portfolio')
  }
</script>