
<template>
  <main>
    <frame-wrap>
      <frame-image src="/media/images/frontpage.webp" />
    </frame-wrap>
    <block margin="none">
      <h2 class="title">
        Make money, make a difference! <omoji emoji="😃" />
      </h2>
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