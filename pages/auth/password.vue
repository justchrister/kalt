
<template>
  <main>
    <navbar :pageTitle="pagename" />
    <div class='page'>
      <div class="section">
        <div class="block">
          <h3>
            Request a new password! <omoji emoji="😃" /> <omoji emoji="☀️" />
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
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  const pagename = 'Sign in';
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
  const email = ref('')
  const resetPassword = async () => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      email.value, {
        redirectTo: 'https://ka.lt/account/password',
    })
    if(data) console.log(data)
  }
</script>