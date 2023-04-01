
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
          <button @click="requestPassword()">
            request
          </button>
        </div>
      </form>
      <div class="element link-group">
        <nuxt-link to="/auth/sign-up">sign up</nuxt-link>
        <nuxt-link to="/auth/">sign in</nuxt-link>
      </div>
    </block>
    <notify :type="notify.type" :message="notify.message" v-if="notify.message" />
  </main>
</template>

<script setup lang="ts">
  definePageMeta({
    pagename: 'Password reset'
  })
  useHead({
    title: 'Password reset',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const notify = ref({
    "type": "sorry",
    "message": "could not sign you in"
  })
  const email = ref('')
  const requestPassword = async () => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      email.value, {
        redirectTo: 'https://ka.lt/profile/password',
    })
    if(data) navigateTo('/auth/lobby')
    if(error) {
      ok.log('error', 'password reset did not work?' + error.message)
    }
  }
</script>