
<template>
  <main>
    <frame>
      <frame-image src="/images/audun-alvestad/waiting-room.png" />
      <frame-image src="/images/apollo-celebration.jpg" />
    </frame>
    <block margin="half">
      <h1> We have sent you an email </h1>
      <p>
        Simply click the link and set a new password. See you soon!
        <omoji emoji="✨" /> If you are still experiencing trouble signing in, please <nuxt-link to="/contact">contact
          us</nuxt-link>.
      </p>
    </block>
    <block margin="half">
      <input-button link="/auth">sign in →</input-button>
    </block>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Lobby'
  })
  useSeoMeta({
    title: 'Lobby',
    ogTitle: 'Lobby',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta.png'
  })
</script>