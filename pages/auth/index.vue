
<template>
  <main>
    <navbar :pageTitle="pagename" />
    <div class='page'>
      <div class="section">
        <div class="block">
          <h3 class="title">
            Sign in or sign up! <omoji emoji="😃" />
          </h3>
          <p> If we cant find an account with your e-mail, we will automatically sign you up. </p>
          <br>
          <form @submit.prevent="() => (signIn())">
            <label for='email'> E-mail</label>
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
            <input type="submit" value="Next" class="atom">
          </form>
          <br>
          <div class="center-text">
            <nuxt-link to="/auth/forgot-password">Forgot password</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  const pagename = 'Sign in/sign up';
  const title = 'Kalt — ' + pagename;
  const description = ref('My App Description')

  const supabase = useSupabaseClient()

  const email = ref('')
  const password = ref('')

  useHead({
    title,
    meta: [{
      name: "description",
      content: description,
    }]
  });
  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if(error){
      signUp()
    }
    navigateTo('/portfolio')
  }

  const signUp = async () => {
    const { user, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value
    }) 
    if(!error) navigateTo('/auth/lobby')
  }
</script>