<script setup lang="ts">
const pagename = 'About us';
const title = 'Kalt — ' + pagename;
const description = ref('My App Description')

useHead({
  title,
  meta: [{
    name: 'description',
    content: description
  }]
})
</script>

<template>
  <div class="PageWrapper">
    <navbar :pageTitle="pagename" />
    <div class='page'>
      <div class="section">
        <div class="frame">
          <div class="image" style="background-image:url(/media/images/homepage_01_min.jpg);">
          </div>
          <div class="image" style="background-image:url(/media/images/homepage_02_min.jpg);">
          </div>
        </div>
        <div class="block">
          <h2 class="title">
            Lets make change happen!
          </h2>
          <p>
            We let anyone be a part of solving the impending energy crisis by developing, depoloying, and letting you invest in fossil-free energy alternatives. A practical solution that works for the wallet, and the world. <br> <br><nuxt-link to="about/how-it-works">Read how it works</nuxt-link> or <nuxt-link to="auth/sign-up">sign up now</nuxt-link>
          </p>
        </div>
        <Cta />
      </div>
    </div>
  </div>
</template>
