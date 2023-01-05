
<template>
  <div class="PageWrapper">
    <navbar :pageTitle="pagename" />
    <div class='page'>
      <div class="section">
        <div class="block">
          <h2 class="title">
            Welcome back! <omoji emoji="😃" /> <omoji emoji="☀️" />
          </h2>
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
            <nuxt-link to="/auth/sign-up">Sign up</nuxt-link>
            <nuxt-link to="/">Forgot password</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const pagename = 'Sign in';
  const title = 'Kalt — ' + pagename;
  const description = ref('My App Description')

  import { createClient } from '@supabase/supabase-js'
  const runtimeConfig = useRuntimeConfig()
  const supabase = createClient(runtimeConfig.supabase_url, runtimeConfig.supabase_key)
  const router = useRouter()

  const email = ref('')
  const password = ref('')

  useHead({
    title,
    meta: [
      {
        name: "description",
        content: description,
      },
    ],
  });

  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    console.log(data)
    router.go(-1)
  }
</script>