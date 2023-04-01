
<template>
  <main>
    <block>
      <h3 class="title">
        Choose a new password! <omoji emoji="😃" /> <omoji emoji="☀️" />
      </h3>
      <form @submit.prevent="resetPassword()">
        <div class="element input password">
        <label for='password'> Password:</label>
        <input
          type="password"
          placeholder="password"
          v-model="password"
          id='password'
        />
        </div>
        <input type="submit" value="Change password">
      </form>
    </block>
  </main>
</template>

<script setup lang="ts">
  definePageMeta({
    pagename: 'Change password',
    middleware: 'auth'
  })
  useHead({
    title: 'Change password',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const password = ref('')
  const resetPassword = async () => {
    const { data, error } = await supabase.auth.updateUser({
      password: password.value
    })
    if(data) console.log(data)
    if(error) console.log(error)
  }
</script>