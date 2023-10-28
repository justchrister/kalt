
<template>
  <main>
    <block margin="double">
      <h1 class="sans-serif" style="font-size: 300%;">
        Invest in the <strong>future</strong>, today.
      </h1>
      <nuxt-link to="/request">
        <h1 class="sans-serif" style="font-size: 300%;">
          start →
        </h1>
      </nuxt-link>
    </block>
    <frame-wrap>
      <frame-image src="/images/frontpage.webp" />
      <frame-video src="/videos/film.mp4" />
    </frame-wrap>
    <block>
      <h1>
        Make money, make a difference! <omoji emoji="😃" />
      </h1>
      <p>
        Join us in using cutting-edge technology to make your money work for you and the world. With our innovative approach, you can contribute to a sustainable future and generate income while making a positive impact.
      </p>
      <p>
        By investing in what you believe in, you can be sure that your money is aligned with your values. 
      </p>
      <pill text="energy" to="funds/ffe" /> <pill text="art" to="funds/art"/> <pill text="housing" to="funds/ah"/> <pill text="startups" to="funds/vc" /> 
    </block>
  </main>
</template>
<script setup>
  definePageMeta({
    pagename: 'Homepage',
    middleware: 'default'
  })
  useHead({
    title: 'Kalt'
  })
</script>