
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
        <button>
          sign up  <loading-icon v-if="loading" />
        </button>
      </form>
    </block>
    <block>
      <link-group>
        <nuxt-link to="/auth">sign in</nuxt-link>
        <nuxt-link to="/auth/password">forgot password</nuxt-link>
      </link-group>
    </block>
    <notification :type="notification.type" :message="notification.message" v-if="notification.message"/>
  </main>
</template>

<script setup>
  definePageMeta({
    pagename: 'Welcome'
  })
  useHead({
    title: 'Welcome'
  })
  const loading = ref(false)
  const client = useSupabaseAuthClient()

  const email = ref('')
  const password = ref('')

  const notification = ref({
    type: null, 
    message: null
  });

  const signUp = async () => {
    const { user, error } = await client.auth.signUp({
      email: email.value,
      password: password.value
    })
    if(error){
      loading.value=false;
      notification.value = {
        type: 'error',
        message: error.message
      }
    } else {
      await navigateTo('/profile')
    }
    
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