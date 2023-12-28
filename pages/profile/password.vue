
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
    <span v-if="notification" @click="setNotification(null)">
      <banner-notification color="yellow" :message="notification"/>
    </span>
  </main>
</template>

<script setup lang="ts">
  definePageMeta({
    pagename: 'Password'
  })
  useHead({
    title: 'Password'
  })

  const notification = ref(null);

  const setNotification = async (message: string) => {
    ok.log('error', message)
    notification.value=message
    loading.value=false
    return
  }

  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const loading = ref(false)
  const password = ref('')
  const resetPassword = async () => {
    loading.value=true
    if (password.value.length < 8){
      setNotification('Password must be at least 8 characters')
    } else {
      const { data, error } = await supabase.auth.updateUser({
        password: password.value
      })
      await ok.sleep(200);
      if(error){
        loading.value=false
        ok.log('error', 'password not changed', error)
      } else{
        loading.value=false
        navigateTo('/auth')
        ok.log('success', 'changed password')
      }
    }
  }
</script>
<style scoped lang="scss">
  button{margin-top: sizer(2);}
</style>