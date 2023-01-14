
<template>
  <div class="PageWrapper">
    <navbar :pageTitle="pagename" />
    <div class="page">
      <div class="section">
        <div class="block">
          <tabs />
          <chart-portfolio :days="days" />
          
    <nav class="pills filters">
      <button @click="setDays(7)">
        7 days
      </button>
      <button @click="setDays(30)">
        30 days
      </button>
      <button @click="setDays(181)">
        6 months
      </button>
      <button @click="setDays(365)">
        max
      </button>
    </nav>
    <nav class="pills CTA">
      <nuxt-link to="portfolio/sell">
        <button style="background-color:#F4442E;">
          SELL
        </button>
      </nuxt-link>
      <nuxt-link to="portfolio/buy">
        <button style="background-color:#0CF574;">
          BUY
        </button>
      </nuxt-link>
    </nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  const pagename = 'Transactions';
  const title = 'Kalt — ' + pagename;
  const description = ref('My App Description')

  const days = ref(10)
  const setDays = (d) => {
    days.value=d
  }
</script>
<style scoped>
nav.pills{
  display:inline-block;
}
nav.pills.filters{
  width:80%;}
nav.pills.CTA{
  width:20%;
  text-align:right;
}
nav.pills.CTA button{
  width:40%;
  text-align:center;
}
</style>