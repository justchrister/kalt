
<template>
  <main>
    <navbar :pageTitle="pagename" />
    <div class='page'>
      <div class="section">
        <div class="block">
          <h3 class="title">
            Welcome back! <omoji emoji="😃" />
          </h3>
          <br>
          <form @submit.prevent="signIn">
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
            <button @click="signIn()">
              sign in
            </button>
          </form>
          <br>
          <div class="center-text link-group">
            <nuxt-link to="/auth/sign-up">sign up</nuxt-link>
            <nuxt-link to="/auth/forgot-password">forgot password</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  const pagename = 'Authentication';
  const title = 'Kalt — ' + pagename;

  const user = useSupabaseUser()
  const client = useSupabaseAuthClient()

  const email = ref('')
  const password = ref('')

  useHead({
    title,
    meta: [{
      name: "description",
      content: "Make money, make a difference."
    }]
  });
  const signIn = async () => {
    const {data, error} = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (error) {
      oklog('error', 'login failed')
    } else {
      navigateTo('/portfolio')
    }
  }
</script>