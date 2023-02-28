
<template>
  <main>
    <navbar :pageTitle="pagename" />
    <div class='page'>
      <div class="section">
        <div class="block">
          <h2 class="title">
            Welcome back! <omoji emoji="😃" /> <omoji emoji="☀️" />
          </h2>
          <form @submit.prevent="() => (signIn())">
            <div class="element input email">
            <label for='email'> Old e-mail:</label>
            <input
              type="email"
              placeholder="Email"
              v-model="old_email"
              id='email'
            />
            </div>
            <div class="element input email">
              <label for='email'> New e-mail:</label>
              <input
                type="email"
                placeholder="Email"
                v-model="new_email"
                id='email'
              />
            </div>
            <input type="submit" value="Sign in" class="atom">
          </form>
          <div class="element link-group">
            <nuxt-link to="/auth/sign-up">Sign up</nuxt-link>
            <nuxt-link to="/">Forgot password</nuxt-link>
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

  const signIn = async () => {
  const { data: user, error } = await supabase.auth.admin.updateUserById(
    user.value.id,
    { email: new_email.value}
  )
  }
</script>