<template>
  <div class="PageWrapper">
    <navbar :pageTitle="pagename" />
    <div class='page'>
      <div class="section">
        <div class="block">
          <h2 class="title">
            Create an account today, earn money tomorrow!
          </h2>
        </div>
        <button class="atom square" @click="navigateTo('/sign-up')">
          sign up →
        </button>
        <button class="atom square" @click="navigateTo('/sign-in')">
          sign in →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const pagename = 'Sign up or in?';
  const title = 'Kalt — ' + pagename;
  const description = ref('My App Description')
  var errormsg = ref('');

  useHead({
    title,
    meta: [
      {
        name: "description",
        content: description,
      },
    ],
  });

  const client = useSupabaseClient()
  const user = useSupabaseUser()
  definePageMeta({
    middleware: ['auth']
  })

  onMounted(() => {
    watchEffect(() => {
      if (user.value) {
        navigateTo('/account/portfolio')
      }
    })
  })
</script>