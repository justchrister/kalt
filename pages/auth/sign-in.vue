
<template>
  <div class="PageWrapper">
    <div class='page'>
      <div class="section">
        <div class="block">
          <h3 class="title">
            Welcome back! <omoji emoji="😃" />
          </h3>
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
            <nuxt-link to="/auth/forgot-password">Forgot password</nuxt-link>
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

  const supabase = useSupabaseClient()
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

  definePageMeta({
    layout: "focused"
  });
  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    router.go(-1)
  }
</script>