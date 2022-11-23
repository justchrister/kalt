<script setup lang="ts">
  const pagename = 'Homepage';
  const title = 'Kalt — ' + pagename;
  const description = ref('My App Description')

  useHead({
    title,
    meta: [
      {
        name: "description",
        content: description,
      },
    ],
  });

</script>
<template>
  <div class="PageWrapper">
    <Kaltmenu :pageTitle="pagename" />
    <div class='page'>
      <div class="section" id="about">
        <div class="frame">
          <div class="image" style="background-image:url(/images/frontpage.webp); margin-left:0;">
          </div>
        </div>
        <div class="block">
          <h2 class="title">
            Make money, make a difference!
          </h2>
          <p>
            By investing your money in solar energy with Kalt, you can do both good and build residual income and wealth at the same time. Feel great, and let your money do something important. 
          </p>
          <p>
            <nuxt-link to="/about">About us</nuxt-link>
          </p>
        </div>
        <Cta />
      </div>
    </div>
  </div>
</template>