<template>
  <div class="PageWrapper">
    <div class='page'>
      <div class="section">
        <div class="block">
          <h2 class="title">
            Create an account today, earn money tomorrow!
          </h2>
          <form @submit.prevent="() => (signUp())">
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
            <input type="submit" value="Sign up" class="atom">
          </form>
          <div class="element link-group">
            <nuxt-link to="/auth/sign-in">Sign in</nuxt-link>
            <nuxt-link to="/auth/forgot-password">Forgot password</nuxt-link>
          </div>
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

  definePageMeta({
    layout: "focused"
  });
  const supabase = useSupabaseClient()
  const email = ref('')
  const password = ref('')

  const signUp = async () => {
    const { user, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value
    }) 
    if(!error){
      navigateTo('/auth/lobby')
    } else {
    }
  }
</script>