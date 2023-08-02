
<template>
  <main>
    <block>
      <h1 class="sans-serif">
        Request a new password! <omoji emoji="🙃" />
      </h1>
      <form @submit.prevent="requestPassword()">
        <div class="input-wrap">
          <label for='email'> E-mail:</label>
          <input
            type="email"
            placeholder="Email"
            v-model="email"
            id='email'
          />
        </div>
        <div class="input-wrap">
          <button>
            request new password
          </button>
        </div>
      </form>
      <link-group>
        <nuxt-link to="/auth/sign-up">sign up</nuxt-link>
        <nuxt-link to="/auth/">sign in</nuxt-link>
      </link-group>
    </block>
    <notification-fixed :type="notification.type" :message="notification.message" v-if="notification.message"/>
  </main>
</template>

<script setup>
  definePageMeta({
    pagename: 'Password reset'
  })
  useHead({
    title: 'Password reset'
  })
  const supabase = useSupabaseClient()

  const notification = ref({
    type: null, 
    message: null
  });
  const redirectTo = window.location.origin + '/profile/password';
  const email = ref('')
  const requestPassword = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(
      email.value, {
        redirectTo: redirectTo,
    })
    if(error) {
      ok.log('error', 'password reset did not work? ' + error.message)
      notification.value={
        type: 'error',
        message: error.message
      }
    } else {
      navigateTo('/auth/lobby')
    }
  }
</script>