
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
        <input-button>change password <loading-icon v-if="loading"/></input-button>
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
  const loading = ref(false)
  const password = ref('')
  const resetPassword = async () => {
    loading.value=true
    const { data, error } = await supabase.auth.updateUser({
      password: password.value
    })
    await ok.sleep(200);
    if(error){
      loading.value=false
      ok.log('error', 'password not changed', error)
    } else{
      await navigateTo("/portfolio")
      ok.log('success', 'changed password')
    }
  }
</script>
<style scoped lang="scss">
  button{margin-top: sizer(2);}
</style>