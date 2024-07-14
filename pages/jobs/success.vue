
<template>
  <main>
    <frame>
      <frame-image src="/images/audun-alvestad/waiting-room.png" />
      <frame-image src="/images/apollo-celebration.jpg" />
    </frame>
    <block margin="half">
      <h1> Thank you! </h1>
      <p>
        We will be in touch very soon <omoji emoji="✨"/>. Looking forward to getting to know you better! 
      </p>
    </block>
    <block margin="half">
      <input-button link="/vision">our vision →</input-button>
    </block>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Lobby'
  })
  
  useSeoMeta({
    title: 'Lobby',
    ogTitle: 'Kalt - Lobby',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta.png'
  })
</script>