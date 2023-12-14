<template>
  <main>
    <block margin="none">
      <h1 class="sans-serif">See you soon! <omoji emoji="😜" /></h1>
      <p>Thanks for hanging out, come back anytime.</p>
      <pill to="/auth" text="sign in" />
      <pill to="/invite/request" text="request invite" />
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Bye'
  })
  useHead({
    title: 'Bye'
  })
  const client = useSupabaseAuthClient()
  const { error } = await client.auth.signOut()
</script>