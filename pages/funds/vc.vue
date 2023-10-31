<template>
  <main>
    <intro-fund title="A safer way to invest in early stage startups." gradient="3"/>
    <block margin="half">
      <intro-block-fund text="The venture capital fund gives you access to a wide variety of early stage startups around the world — with clear set of criteria for picking the companies and founders we invest in."/>
    </block>
    <block margin="half">
      <criteria-list>
        <criteria :nr="1">
          A clear path to profitability.
        </criteria>
        <criteria :nr="2">
          An extraordinary founding team.
        </criteria>
        <criteria :nr="3">
          Innovative technology or business practices.
        </criteria>
        <criteria :nr="4">
          Alignment with our objectives and mission.
        </criteria>
        <criteria :nr="5">
          Market potential and target audience analysis.
        </criteria>
      </criteria-list>
    </block>
    <block margin="half">
      <h2> The thesis </h2>
      <p>
        Our investment strategy is driven by the potential for meaningful change. If no compelling investment opportunities meet our criteria, we simply don't invest. 
      </p>
      <p>
        In the dynamic world of venture capital, we look for outstanding startups that combine innovation, sustainability, and profitability. We invest in companies with strong growth prospects in specific market segments, led by capable founding teams committed to responsible business and impactful outcomes. 
      </p>
      <p>
        With this approach, we don't just aim for financial growth; we are driving meaningful change, shaping a future where innovation, sustainability, and profitability coalesce. The criteria for us to consider an investment reflect our commitment to fostering innovation, sustainability, and ethical responsibility in the ventures we support.
      </p>
      <button @click="navigateTo('/invest')"> invest now -> </button>
    </block>
    <block margin="2">
      <h2> Ventures </h2>
      <venture-list>
        <venture-shield id="tillit"/>
        <venture-shield id="empress"/>
      </venture-list>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Venture capital'
  })
  useHead({
    title: 'Venture capital',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
  
</script>
<style scoped lang="scss">
  main{
    padding-top:0;
  }
</style>
