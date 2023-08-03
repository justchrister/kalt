
<template>
  <main>
    <block margin="half">
      <h1 class="sans-serif">
        Welcome back! <omoji emoji="😃" />
      </h1>
      <form @submit.prevent="signIn">
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
          <button>
            sign in <loading-icon v-if="loading" />
          </button>
        </div>
      </form>
    </block>
    <block margin="half">
      <link-group>
        <nuxt-link to="/request">request invite</nuxt-link>
        <nuxt-link to="/auth/password">password reset</nuxt-link>
      </link-group>
    </block>
    <notification-fixed :type="notification.type" :message="notification.message" v-if="notification.message"/>
  </main>
</template>

<script setup>
  definePageMeta({
    pagename: 'Hello'
  })
  useHead({
    title: 'Hello'
  })
  const loading = ref(false)
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()
  const client = useSupabaseAuthClient()

  const email = ref('')
  const password = ref('')
  const notification = ref({
    type: null, 
    message: null
  });
  const signIn = async () => {
    loading.value = true
    const {data, error} = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if(error) {
      loading.value = false
      ok.log('error', 'could not sign in '+email.value+': ', error);

      if(password.value.length<8){
        ok.log('error', 'password too short');
        notification.value={
          type: 'error',
          message: 'Password too short'
        }
      } else{
        notification.value={
          type: 'error',
          message: error.message
        }
        ok.log('error', 'could not sign in '+email.value+': ', error)
      }
    }
    if(data){
      ok.log('success', 'signed in ' + email.value + ' successfully: ' + data);
    }
  }
  watchEffect(async () => {
    if (user.value) {
      await navigateTo("/portfolio");
      loading.value = false
    }
  })
</script>
<style scoped lang="scss">
  button{
    margin-top:$clamp-2;
  }
  a{
    margin:0 $clamp-0-5;
  }
</style>