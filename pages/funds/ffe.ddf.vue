<template>
  <main>
    <block margin="half">
      <intro-fund text="The fossil-free energy fund invests in energy generating infrastructure, in high impact geographies, low current supply, and high projected growth-by "/>
    </block>
    <block>
      <criteria-list>
        <criteria :nr="1">
          The geographical area must have high GDP growth potential
        </criteria>
        <criteria :nr="2">
          The geographical area must have high energy generation potential
        </criteria>
        <criteria :nr="3">
          The country must have moderate to low political risk
        </criteria>
        <criteria :nr="3">
          The art has seen a 15%+ average increase in value.
        </criteria>
      </criteria-list>
    </block>
    <block>
      By investing in the Fossil-free energy you can own a piece of all our artworks, and enjoy the benefits of a diversified portfolio of art.
      <br><br>
      <button @click="navigateTo('/invest')"> invest now -> </button>
    </block>
    <block>
      <h1>the art</h1>
      <artwork 
        title="All colored cast, part II"
        artist="Jean-Michel Basquiat"
        image="/art/all-coloured-mockup.webp"
      />
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Fossil-free energy'
  })
  useHead({
    title: 'Fossil-free energy',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })
  
</script>
<style scoped lang="scss">

</style>