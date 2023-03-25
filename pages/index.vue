
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
            Join us in using cutting-edge technology to make your money work for you and the world. With our innovative approach, you can contribute to a sustainable future and generate income while making a positive impact.
            <br>
            <br>
          </p>
          <p class="links">
            <nuxt-link to="/questions/how-does-it-work">How it works</nuxt-link>
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
</script>