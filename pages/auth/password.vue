
<template>
  <main>
    <navbar :pageTitle="pagename" />
    <div class='page'>
      <div class="block">
        <h3>
          Request a new password! <omoji emoji="🙃" />
        </h3>
        <form @submit.prevent="resetPassword()">
          <div class="element input email">
          <label for='email'> E-mail:</label>
          <input
            type="email"
            placeholder="Email"
            v-model="email"
            id='email'
          />
          </div>
          <input type="submit" value="Send reset link" class="atom">
        </form>
        <div class="element link-group">
          <nuxt-link to="/auth/sign-up">sign up</nuxt-link>
          <nuxt-link to="/auth/">sign in</nuxt-link>
        </div>
      </div>
      <notify :type="notify.type" :message="notify.message" v-if="notify.message" />
    </div>
  </main>
</template>

<script setup lang="ts">
  const pagename = 'Password reset';
  const title = 'Kalt — ' + pagename;

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const router = useRouter()

  useHead({
    title,
    meta: [{
      name: "description",
      content: "Make money, make a difference."
    }]
  });
  const notify = ref({
    "type": "sorry",
    "message": "could not sign you in"
  })
  const email = ref('')
  const resetPassword = async () => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      email.value, {
        redirectTo: 'https://ka.lt/account/password',
    })
    if(data) router.push('/auth/lobby')
    if(error) {

    }
  }
</script>