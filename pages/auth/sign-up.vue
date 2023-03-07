
<template>
  <main>
    <navbar :pageTitle="pagename" />
    <div class='page'>
      <div class="section">
        <div class="block">
          <h3 class="title">
            Welcome to the club! <omoji emoji="😃" />
          </h3>
          <br>
          <form @submit.prevent="signUp">
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
            <input type="submit" value="next" class="atom" />
          </form>
          <br>
          <div class="center-text link-group">
            <nuxt-link to="/auth">sign in</nuxt-link>
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
  const router = useRouter()

  const email = ref('')
  const password = ref('')

  useHead({
    title,
    meta: [{
      name: "description",
      content: "Make money, make a difference."
    }]
  });

  const signUp = async () => {
    const { user, error } = await client.auth.signUp({
      email: email.value,
      password: password.value
    }) 
    router.push('/auth/lobby')
  }
</script>