<template>
  <main>
    <frame-wrap>
      <frame-image src="/images/architecture/brutalist-house-in-affligem.jpg" />
      <frame-image src="/images/eddy-mercx-1970.jpg" />
    </frame-wrap>
    <block margin="half">
      <h1>
        Be the change you want to see in the world
      </h1>
      <p>
        Invest in what matters most to you, whether that be affordable housing for low income families, clean fossil-free energy, or contemporary art. 
      </p>
      <p>
        By investing with us, you can directly contribute to the development and deployment of fossil-free energy alternatives, or give families in empowerished areas a chance to have a safe home. 
      </p>
      <p>
        The best part? You can do all this, while making money on a daily basis. 
      </p>
      <p>
        Read <nuxt-link to="questions/how-does-it-work">how it works</nuxt-link> or <nuxt-link to="about/values">our values and goals</nuxt-link>
      </p>
    </block>
    <block>
      <cta />
    </block>
    <block>
      <h2> Impact investing </h2>
      <p> We believe the only way to have actual impact is to use the market forces to make a change. The issues we are facing require a lot of funding, and the only way to allocate the adequate capital, is if that capital actually gives a return on investment </p>
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
    <block>
      <h2> Questions and answers </h2>
      <p> We believe the only way to have actual impact is to use the market forces to make a change. The issues we are facing require a lot of funding, and the only way to allocate the adequate capital, is if that capital actually gives a return on investment </p>
      <chat-link to="/questions/how-does-it-work?">
        How does it work?
      </chat-link>
      <chat-link to="/questions/ddf?">
        What is a direct dividend fund?
      </chat-link>
      <chat-link to="/questions/how-do-you-make-money">
        How does Kalt make money?
      </chat-link>
      <chat-link to="/questions/what-is-residual-income?">
        What is residual income?
      </chat-link>
      <chat-link to="/questions/compound-interest?">
        How does compound interest work?
      </chat-link>
    </block>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'About us'
  })
  useHead({
    title: 'About us'
  })
  
</script>
