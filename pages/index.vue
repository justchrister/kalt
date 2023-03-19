
<template>
  <main>
    <navbar :pageTitle="pagename" />
    <div class='page'>
      <div class="section" id="about">
        <div class="frame">
          <div class="image" style="background-image:url(/media/images/frontpage.webp); margin-left:0;">
          </div>
        </div>
        <div class="block">
          <h2 class="title">
            Make money, make a difference! <omoji emoji="😃" />
          </h2>
          <p>
            Make your money work for you and the world. By investing in solar energy with us, you can do good and build residual income at the same time. 
          </p>
          <p class="links">
            <nuxt-link to="/about/how-it-works">How it works</nuxt-link>
            <nuxt-link to="/about">About us</nuxt-link>
          </p>
        </div>
        <div class="block">
        <Cta />
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
  const pagename = 'Homepage';
  const title = 'Kalt — ' + pagename;
  useHead({
    title,
    meta: [{
      name: "description",
      content: "Make money, make a difference."
    }]
  })
  oklog('success', 'test')
</script>