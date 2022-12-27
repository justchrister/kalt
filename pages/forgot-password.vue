
<template>
  <div class="PageWrapper">
    <navbar :pageTitle="pagename" />
    <div class='page'>
      <div class="section">
        <div class="block">
          <h2 class="title">
            Welcome back! 😃
          </h2>
        </div>
        <form @submit.prevent="() => (signIn())">
          <label class="atom" for="email">
            E-mail:
          </label>
          <input class="atom" type="email" id="email">
          <label class="atom" for="password">
            Password:
          </label>
          <input class="password" type="password" id="password">

          <input type="submit" value="Log in" />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { createClient } from '@supabase/supabase-js'
  const runtimeConfig = useRuntimeConfig()
  const supabase = createClient(runtimeConfig.supabaseUrl, runtimeConfig.supabaseSecret)
  
  const pagename = 'Sign in';
  const title = 'Kalt — ' + pagename;
  useHead({
    title,
  });

  const form = reactive({
    data: {
      email: '',
      password: '',
    },
  });

  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.data.email,
      password: form.data.password,
    })
    if (error.status = 400){
      console.log('Please check login details')
      console.log(form.data.email)
      console.log(form.data.password)
    }
  }
</script>