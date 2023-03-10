<template>
  <main>
    <navbar :pageTitle="pagename" />
    <div class='page'>
      <div class="section">
        <div class="block">
          <h3>See you soon! <omoji emoji="😜" /></h3>
          <p>Thanks for hanging out, come back anytime.</p>
          <bomb to="/auth" text="sign in" />
          <bomb to="/auth/sign-up" text="sign up" />
        </div>
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