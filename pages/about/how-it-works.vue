<script setup lang="ts">
const pagename = 'How it works';
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
          <div class="image" style="background-image:url(/images/dall-e/fallacy.png);">
          </div>
          <div class="image" style="background-image:url(/images/dall-e/sunlight.png);">
          </div>
        </div>
        <div class="block">
          <h2> 1. We build fossil-free energy sites all over the world</h2>
          <p> We build both smaller sites in villages and huge industrial scale sites, close to cities or industrial areas. This supercharges the transition to fossil free energy everywhere, not just in cities. This also makes the electrical grids more resilient and stable. </p>
        </div>
      </div>
      <div class="section">
        <div class="block">
          <h2> 2. Then we add all those sites to a big pool of sites</h2>
          <p> So that you dont just invest in a single solar panel, rather you buy shares in the fund that owns all the solar panels all over the world. Decreased risk for both us and you. </p>
        </div>
      </div>
      <div class="section">
        <div class="block">
          <h2> 3. We let anyone buy shares in the fund </h2>
          <p> Instead of investing in a single solar panel, you buy shares of the pool of all our solar panels. Less risk for you, energy for all! </p>
        </div>
      </div>
      <div class="section">
        <div class="block">
          <h2> 4. When we sell the fossil free energy to the markets, you earn money</h2>
          <p> We are always selling energy, so you are always making money. If you own 10% of all shares, you get 10% of the income </p>
        </div>
      </div>
      <div class="section">
        <div class="block">
          <h2> 5. You can feel good</h2>
          <p> Knowing your money is making a difference for families in developing regions, for the environment, and generating you a passive income. Win, win, win for all! </p>
        </div>
      </div>
      <div class="section">
        <div class="block">
          <h2> 6. Sounds too good to be true? </h2>
          <p> Try it out today, and if you arent satisfied, you can get your money back within 60 days </p>
        </div>
        <Cta />
      </div>
    </div>
  </div>
</template>
