
<template>
  <div class="PageWrapper">
    <navbar :pageTitle="pagename" />
    <div class="page">
      <div class="section">
        <div class="block">
          <tabs />
          <div class="frame">
            <chart-portfolio :days="days" />
          </div>
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
              <button>
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
        <div class="block">
          <div class="goal" style="background-image:url(media/gallery/david-hockney/pretty-flowers.png);">
            2 398,- earned so far
          </div>
          <div class="goal" style="background-image:url(media/gallery/david-hockney/pretty-flowers-2.png);">
            2 398,- earned so far
          </div>
          <div class="goal" style="background-image:url(media/gallery/david-hockney/pretty-flowers-2.png);">
            2 398,- earned so far
          </div>
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
    meta: [
      {
        name: "description",
        content: description,
      },
    ],
  });

  const days = ref(10)
  const setDays = (d) => {
    days.value=d
  }
</script>
<style scoped>
.goal{
  min-height:150px;
  padding-left:200px;
  background-position:left;
  background-size:contain;
  background-repeat: no-repeat;
  line-height:150px;
  margin-top:30px;
}
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