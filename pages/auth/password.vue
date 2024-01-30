
<template>
  <main>
    <block>
      <h1 class="sans-serif">
        Request a new password!
        <omoji emoji="🙃" />
      </h1>
      <form @submit.prevent="requestPassword()">
        <div class="input-wrap">
          <label for='email'> E-mail:</label>
          <input type="email" placeholder="Email" v-model="email" id='email' />
        </div>
        <input-button>request new password <loading-icon v-if="loading" /></input-button>
      </form>
      <link-group>
        <nuxt-link to="/auth/">sign in</nuxt-link>
      </link-group>
    </block>
    <notification :type="notification.type" :message="notification.message" v-if="notification.message" />
  </main>
</template>

<script setup lang="ts">
  definePageMeta({
    pagename: 'Password reset'
  })
  useHead({
    title: 'Password reset'
  })
  const supabase = useSupabaseClient()
  const loading = ref(false)
  const notification = ref({
    type: null,
    message: null
  });
  const redirectTo = window.location.origin + '/profile/password';
  const email = ref('')
  const requestPassword = async () => {
    if (loading.value) return
    loading.value = true
    const { error } = await supabase.auth.resetPasswordForEmail(
      email.value, {
      redirectTo: redirectTo,
    })
    await ok.sleep(200);
    if (!error) {
      navigateTo('/success/password')
    } else {
      ok.log('error', 'password reset did not work? ' + error)
      notification.value = {
        type: 'error',
        message: error.message
      }
    }
  }
</script>