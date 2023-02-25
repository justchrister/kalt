
<template>
  <div class="PageWrapper">
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
        <cta /> 
        <nuxt-link to="portfolio/sell">or sell</nuxt-link>
      </div>
      <div class="section impacts">
        <h3>Our impact <omoji emoji="😮"/></h3>
        <div class="impact"  style="background-image:url('/Plant.svg');">
          You and your investments have lowered the impact equals to planting <code class="green">2 000</code> trees, and together we've planted <code>3 000 000</code>
        </div>
        <div class="impact" style="background-image:url('/hug.svg');">
          It's also given electricity a whole day of electricity to <code class="yellow">130</code> families, and together we've <code>3 000 000</code>
        </div>
      </div>
    </div>
  </div>
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