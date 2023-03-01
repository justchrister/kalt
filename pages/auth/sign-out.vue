<template>
  <main>
    <navbar :pageTitle="pagename" />
    <div class='page'>
      <div class="section">
        <div class="block">        
          <Image :images="['/media/images/dall-e/404_2.png']" /> 
        </div>
        <div class="block">
          <h1>See you soon!</h1>
          <p>Press the menu button, or go back to the previous page.</p>
        </div>
      </div>
    </div>
  </main>
</template>
<script lang="ts" setup>
  const client = useSupabaseAuthClient()
  const { error } = await client.auth.signOut()
</script>