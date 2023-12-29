
<template>
  <main>
    <block margin="double" width="wide">
      <h1 style="font-size: 250%;text-align:center;">
        Invest in the <strong>future</strong>, today.
      </h1>
      <nuxt-link to="/invite/request/amount">
        <h1 style="font-size: 250%;text-align:center;">
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
    <promo-block-list>
      <promo-block
        title="Powered by AI">
        Capital is allocated using proprietary AI to earn you a stable return on your investment.
      </promo-block>
      <promo-block
        title="Impact investing">
        The companies and assets we invest in always align with your values.
      </promo-block>
      <promo-block
        title="Curated assets">
        All investments are carefully selected using quantitative investment strategies.
      </promo-block>
    </promo-block-list>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Homepage',
    middleware: 'default'
  })
  useHead({
    title: 'Kalt'
  })
</script>