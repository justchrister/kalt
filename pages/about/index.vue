<template>
  <main>
    <frame-wrap>
      <frame-image src="/media/images/architecture/brutalist-house-in-affligem.jpg" />
      <frame-image src="/media/images/eddy-mercx-1970.jpg" />
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
  </main>
</template>
<script setup>
  definePageMeta({
    pagename: 'About us',
    middleware: 'default'
  })
  useHead({
    title: 'About us'
  })
  
</script>
