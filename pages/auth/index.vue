
<template>
  <main>
    <block margin="half">
      <h1 class="sans-serif">
        Welcome back!
        <omoji emoji="😃" />
      </h1>
      <form @submit.prevent="signIn">
        <div class="input-wrap">
          <label for='email'> E-mail</label>
          <input type="email" placeholder="Email" v-model="email" id='email' />
        </div>
        <div class="input-wrap">
          <label for='password'> Password </label>
          <input type="password" placeholder="Password" v-model="password" id='password' />
        </div>
        <input-button>sign in <loading-icon v-if="loading" /></input-button>
      </form>
    </block>
    <block margin="half">
      <link-group>
        <nuxt-link to="/invite/request/amount">request invite</nuxt-link>
        <nuxt-link to="/auth/password">password reset</nuxt-link>
      </link-group>
    </block>
    <span v-if="notification" @click="setNotification(null)">
      <banner-notification color="yellow" :message="notification" />
    </span>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Hello'
  })
  
  useSeoMeta({
    title: 'Hello',
    ogTitle: 'Hello',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta.png'
  })
  const loading = ref(false)
  const supabase = useSupabaseClient()
  const email = ref('')
  const password = ref('')
  const notification = ref(null);

  const setNotification = async (message) => {
    notification.value = message
    loading.value = false
    return
  }
  const signIn = async () => {
    loading.value = true

    if (!email.value) {
      setNotification('Please enter the email');
    } else if (!password.value) {
      setNotification('Please enter the password');
    } else if (password.value.length < 8) {
      setNotification('Password too short');
    } else if (!email.value.includes('@')) {
      setNotification('Please enter a valid email');
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      })

      if (error) {
        loading.value = false
        setNotification(error.message);
        ok.log('error', 'could not sign in: '+error.message)
      } else if (data) {
        ok.log('success', 'signed in ' + email.value + ' successfully');
        await navigateTo("/portfolio");
        loading.value = false
      }
    }
  }
</script>
<style scoped lang="scss">
  button {
    margin-top: sizer(2);
  }
  a {
    margin: 0 sizer(0.5);
  }
</style>