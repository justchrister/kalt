<template>
  <main>
    
    <div class='page'>
      <div class="block">
        <h1 class="sans-serif">See you soon! <omoji emoji="😜" /></h1>
        <p>Thanks for hanging out, come back anytime.</p>
        <bomb to="/auth" text="sign in" />
        <bomb to="/auth/sign-up" text="sign up" />
      </div>
    </div>
  </main>
</template>
<script lang="ts" setup>
  const pagename = 'Bye';
  const title = 'Kalt — ' + pagename;
  useHead({
    title,
    meta: [{
      name: "description",
      content: "Make money, make a difference."
    }]
  })

  const client = useSupabaseAuthClient()
  const { error } = await client.auth.signOut()
</script>