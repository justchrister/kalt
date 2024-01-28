
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
    <frame>
      <frame-image src="/images/frontpage.webp" />
      <frame-video src="/videos/film.mp4" />
    </frame>
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
    <carousel>
      <carousel-item
        title="Powered by AI">
        Capital is allocated using proprietary AI to earn you a stable return on your investment.
      </carousel-item>
      <carousel-item
        title="Impact investing">
        The companies and assets we invest in always align with your values.
      </carousel-item>
      <carousel-item
        title="Curated assets">
        All investments are carefully selected using quantitative investment strategies.
      </carousel-item>
    </carousel>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Homepage'
  })
  useHead({
    title: 'Kalt'
  })
</script>