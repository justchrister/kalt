
<template>
  <main>
    <frame-wrap>
      <frame-image src="/media/images/audun-alvestad/waiting-room.png" />
      <frame-image src="/media/images/apollo-celebration.jpg" />
    </frame-wrap>
    <block margin="half">
      <h1> One small step for you, a big step for mankind. <omoji emoji="✨" /> </h1>
      <p> You are just one step away from investing in the future of fossil-free energy. We will contact you once we have had time to review your request. Thank you for yur patience. </p>
    </block>
    <block margin="half">
      <nuxt-link to="/auth" >
          <button tabindex="-1">sign in</button>
      </nuxt-link>
    </block>
  </main>
</template>
<script setup>
  definePageMeta({
    pagename: 'Lobby'
  })
  useHead({
    title: 'Lobby'
  })
</script>