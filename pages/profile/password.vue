
<template>
  <main>
    <block>
      <h1>
        Set a new password! <omoji emoji="😃" /> <omoji emoji="☀️" />
      </h1>
      <form @submit.prevent="resetPassword()">
        <div class="input-wrap">
          <label for='password'> Password:</label>
          <input
            type="password"
            placeholder="password"
            v-model="password"
            id='password'
          />
        </div>
        <button> Change password </button>
      </form>
    </block>
  </main>
</template>

<script setup>
  definePageMeta({
    pagename: 'Password'
  })
  useHead({
    title: 'Password'
  })

  const supabase = useSupabaseClient()
  const userId = useSupabaseUser()

  const password = ref('')
  const resetPassword = async () => {
    const { data, error } = await supabase.auth.updateUser({
      password: password.value
    })
    if(error){
      ok.log('error', 'password not changed', error)
    } else{
      // await navigateTo("/portfolio")
      ok.log('success', 'changed password')
    }
  }
</script>
<style scoped lang="scss">
  button{margin-top:$clamp-2;}
</style>