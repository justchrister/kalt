
<template>
  <main>
    <frame>
      <frame-image src="/images/audun-alvestad/waiting-room.png" />
      <frame-image src="/images/apollo-celebration.jpg" />
    </frame>
    <block margin="half">
      <h1> One small step for you, a big step for mankind.
        <omoji emoji="✨" />
      </h1>
      <p> You are just one step away from investing in the future of fossil-free energy. We will contact you once we have
        had time to review your request. Thank you for yur patience. </p>
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
    ogTitle: 'Kalt - Lobby',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta.png'
  })
</script>