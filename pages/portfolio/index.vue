
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
        <nav class="pills">
          <nuxt-link to="portfolio/sell">
            <button class="pill sell">
              SELL
            </button>
          </nuxt-link>
          <nuxt-link to="portfolio/buy">
            <button class="pill buy">
              BUY
            </button>
          </nuxt-link>
        </nav>
      </div>
    </div>
    <div class="page impact green">
      <div class="section" style=";padding:0;">
          <h3> You've lowered the emissions like planting <code>2 000</code> trees. </h3>
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