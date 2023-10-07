<template>
  <main>
    <block margin="half">
      <intro-fund ticker="ffe" text="The fossil-free energy fund invests in energy generating infrastructure, in high impact geographies, low current supply, and high projected growth-by "/>
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
      </criteria-list>
    </block>
    <block>
      By investing in the Fossil-free energy you can own a piece of all our artworks, and enjoy the benefits of a diversified portfolio of art.
      <br><br>
      <button @click="navigateTo('/invest')"> invest now -> </button>
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
      content: 'Invest in the future, today.'
    }]
  })
  
</script>
<style scoped lang="scss">

</style>