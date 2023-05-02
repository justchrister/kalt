
<template>
  <main>
    <block margin="double">
      <h1 class="sans-serif" style="font-size: 300%;">
        Invest in the <strong>future</strong>, today.
      </h1>
      <nuxt-link to="/invest-flow">
        <h1 class="sans-serif" style="font-size: 300%;">
          start →
        </h1>
      </nuxt-link>
    </block>
    <frame-wrap>
      <frame-image src="/media/images/frontpage.webp" />
    </frame-wrap>
    <block margin="none">
      <h1 class="sans-serif">
        Make money, make a difference! <omoji emoji="😃" />
      </h1>
      <p>
        Join us in using cutting-edge technology to make your money work for you and the world. With our innovative approach, you can contribute to a sustainable future and generate income while making a positive impact.
        <br>
        <br>
      </p>
    </block>
    <block>
      <cta />
    </block>
  </main>
</template>
<script setup>
  definePageMeta({
    pagename: 'Homepage'
  })
  useHead({
    title: 'Kalt'
  })
</script>