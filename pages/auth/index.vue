
<template>
  <main>
    <div class="block">
      <h1 class="sans-serif">
        Welcome back! <omoji emoji="😃" />
      </h1>
      <form @submit.prevent="signIn()">
        <label for='email'> E-mail</label>
        <input
          type="email"
          placeholder="Email"
          v-model="email"
          id='email'
        />
        <div class="element input password">
          <label class="atom" for='password'> Password </label>
          <input
            type="password"
            placeholder="Password"
            v-model="password"
            id='password'
          />
        </div>
      </form>
      <br>
      <button @click="signIn()">
        sign in
      </button>
      <br>
      <div class="center-text link-group">
        <nuxt-link to="/auth/sign-up">sign up</nuxt-link>
        <nuxt-link to="/auth/password">forgot password</nuxt-link>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  definePageMeta({
    pagename: 'Hello'
  })
  useHead({
    title: 'Kalt — Hello',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })

  const user = useSupabaseUser()
  const client = useSupabaseAuthClient()

  const email = ref('')
  const password = ref('')

  const signIn = async () => {
    const {data, error} = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
  }
  watchEffect(async () => {
    if (user.value) {
      await navigateTo("/portfolio");
    }
  })
</script>