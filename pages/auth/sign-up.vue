
<template>
  <main>
    <block margin="half">
      <h1 class="sans-serif">
        Welcome to the club! <omoji emoji="😃" />
      </h1>
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
    </block>
    <block>
      <div class="center-text link-group">
        <nuxt-link to="/auth">sign in</nuxt-link>
        <nuxt-link to="/auth/forgot-password">forgot password</nuxt-link>
      </div>
    </block>
  </main>
</template>

<script setup lang="ts">
  definePageMeta({
    pagename: 'Welcome'
  })
  useHead({
    title: 'Welcome',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })

  const user = useSupabaseUser()
  const client = useSupabaseAuthClient()
  const router = useRouter()

  const email = ref('')
  const password = ref('')

  const signUp = async () => {
    const { user, error } = await client.auth.signUp({
      email: email.value,
      password: password.value
    }) 
    router.push('/auth/lobby')
  }
</script>