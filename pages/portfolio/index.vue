
<template>
  <main>
    <navbar :pageTitle="pagename" />
    <div class="page">
      <div class="section">
        <tabs />
        <div class="frame">
          <div class="chart">
            <chart-portfolio :days="days" />
          </div>
        </div>
        <nav class="pills filters">
          <button @click="setDays(7)" class="pill">
            7 days
          </button>
          <button @click="setDays(30)" class="pill">
            30 days
          </button>
          <button @click="setDays(181)" class="pill">
            6 months
          </button>
          <button @click="setDays(365)" class="pill">
            max
          </button>
        </nav>
        <div class="block center-text">
          <cta />
          <nuxt-link to="portfolio/sell">or sell</nuxt-link>
        </div>
        <div class="block">
          <h3>Our impact in numbers <omoji emoji="😮"/></h3>
          <p> Your investments has helped decrease the emissions in the worls as much as </p>
          <div class="impacts">
            <impact type="car" title="Driving 1 000 km in a Fiat Panda" />
            <impact type="house" title="Construction of a 200 m2 house" />
            <impact type="plane" title="Flying 1.4 times to Paris from Tokyo" />
            <impact type="computer" title="Building and selling 10 computers" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
  const pagename = 'Portfolio';
  const title = 'Kalt — ' + pagename;
  const description = ref('My App Description')
  useHead({
    title,
    meta: [{
      name: "description",
      content: description,
    }]
  });
  definePageMeta({
    middleware: 'auth'
  })
  const days = ref(10)
  const setDays = (x) => {
    days.value=x
  }
</script>