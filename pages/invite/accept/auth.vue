
<template>
  <main>
    <block margin="half">
      <h1 class="sans-serif">
        Welcome to the club!
        <omoji emoji="😃" />
      </h1>
      <form @submit.prevent="signUp">
        <div class="input-wrap">
          <label for='email'> E-mail</label>
          <input type="email" placeholder="Email" v-model="email" id='email' />
        </div>
        <div class="input-wrap">
          <label for='password'> Password </label>
          <input type="password" placeholder="Password" v-model="password" id='password' />
        </div>
        <input-button>next -> <loading-icon v-if="loading" /></input-button>
      </form>
    </block>
    <span v-if="notification" @click="setNotification(null)">
      <banner-notification color="yellow" :message="notification" />
    </span>
  </main>
</template>

<script setup lang="ts">
  definePageMeta({
    pagename: 'Welcome'
  })
  useHead({
    title: 'Welcome'
  })
  const loading = ref(false)
  const supabase = useSupabaseClient()

  const email = ref('')
  const password = ref('')
  const notification = ref(null);

  const setNotification = async (message) => {
    ok.log('error', message)
    notification.value = message
    loading.value = false
    return
  }

  const signUp = async () => {
    loading.value = true
    if (!email.value) {
      setNotification('Please enter your email')
    } else if (!password.value) {
      setNotification('Please enter your password')
    } else if (password.value.length < 8) {
      setNotification('Password must be at least 8 characters')
    } else {
      const { user, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value
      })
      if (error) {
        setNotification(error.message)
      } else {
        await ok.sleep(800);
        loading.value = false;
        await navigateTo('/invite/accept/name')
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