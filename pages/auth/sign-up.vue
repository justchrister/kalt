
<template>
  <main>
    <block margin="half">
      <h1 class="sans-serif">
        Welcome to the club! <omoji emoji="😃" />
      </h1>
      <form @submit.prevent="signUp">
        <div class="input-wrap">
          <label for='email'> E-mail</label>
          <input
            type="email"
            placeholder="Email"
            v-model="email"
            id='email'
          />
        </div>
        <div class="input-wrap">
          <label for='password'> Password </label>
          <input 
            type="password"
            placeholder="Password"
            v-model="password"
            id='password'
          />
        </div>
        <div class="input-wrap">
          <button @click="signUp()">
            sign up
          </button>
        </div>
      </form>
    </block>
    <block>
      <link-group>
        <nuxt-link to="/auth">sign in</nuxt-link>
        <nuxt-link to="/auth/password">forgot password</nuxt-link>
      </link-group>
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

<style scoped lang="scss">
  button{
    margin-top:$clamp-2;
  }
  a{
    margin:0 $clamp-0-5;
  }
</style>