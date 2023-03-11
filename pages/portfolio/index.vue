
<template>
  <main>
    <navbar :pageTitle="pagename" />
    <div class="page">
      <div class="section">
        <navbar-tabs />
        <div class="frame">
          <div class="chart">
            <chart-portfolio :days="days" />
          </div>
        </div>
        <nav class="component pills filters">
          <div class="overflow-wrap">
            <ul>
              <li>
                <button @click="setDays(7)" class="element pill">
                  <span class="live-bullet">•</span> live
                </button>
              </li>
              <li>
                <button @click="setDays(30)" class="element pill">
                  1 month
                </button>
              </li>
              <li>
                <button @click="setDays(90)" class="element pill">
                  3 months
                </button>
              </li>
              <li>
                <button @click="setDays(180)" class="element pill">
                  6 months
                </button>
              </li>
              <li>
                <button @click="setDays(365)" class="element pill">
                  1 year
                </button>
              </li>
              <li>
                <button @click="setDays(1095)" class="element pill">
                  3 years
                </button>
              </li>
              <li>
                <button @click="setDays(1825)" class="element pill">
                  5 years
                </button>
              </li>
              <li>
                <!-- should be days since first investment-->
                <button @click="setDays(1825)" class="element pill">
                  max
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <div class="block center-text">
          <cta :showDivest="true"/>
        </div>
        <div class="block">
          <h3>Our impact in numbers <omoji emoji="😮"/></h3>
          <p> Your investments has decreased your carbon footprint by 90 tonnes of Co2, in other words:  </p>
          <div class="impacts">
            <impact type="car" title="Driving 1 000 km in a Fiat Panda" />
            <impact type="house" title="Construction of a 200 m2 house" />
            <impact type="plane" title="Flying 1.4 times to Paris from Tokyo" />
            <impact type="computer" title="Producing, shipping and eating 9 000 avocadoes" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
  const pagename = 'Portfolio';
  const title = 'Kalt — ' + pagename;
  useHead({
    title,
    meta: [{
      name: "description",
      content: "Make money, make a difference."
    }]
  });
  definePageMeta({
    middleware: 'auth'
  })
  const days = ref(7)
  const setDays = (x) => {
    days.value=x
  }
</script>