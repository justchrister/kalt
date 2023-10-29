<template>
  <main>
    <intro-fund-3 title="A safer way of investing in early stage startups." gradient="2"/>
    <block margin="half">
      <intro-fund ticker="" text="The venture capital fund gives you access to a wide range of early stage startups around the world — with clear set of criteria for picking the companies and founders we invest in."/>
    </block>
    <block margin="half">
      <criteria-list2>
        <criteria :nr="1">
          A feasible path to profitability.
        </criteria>
        <criteria :nr="2">
          An evaluation of the qualifications and experience of the venture's founding team.
        </criteria>
        <criteria :nr="3">
          It must incorporate innovative technology, application, or business practices.
        </criteria>
        <criteria :nr="4">
          Ventures must align closely with our overarching objectives and mission.
        </criteria>
        <criteria :nr="5">
          Consideration for ventures with a strong focus on sustainability and responsible practices.
        </criteria>
        <criteria :nr="6">
          An analysis of the market, growth potential, and target audience for the venture.
        </criteria>
        <criteria :nr="7">
          Ventures should adhere to ethical and responsible business conduct.
        </criteria>
      </criteria-list2>
    </block>
    <block margin="half">
      <h2> The thesis </h2>
      <p>
        In the dynamic world of venture capital, we operate at the speed of opportunity, embracing ventures that epitomize innovation, sustainability, and profitability. Central to our investment philosophy is the belief in the catalytic power of innovation. We actively seek ventures that chart a feasible path to profitability, underpinned by pioneering technology, forward-thinking applications of technology, or groundbreaking business practices. The caliber of the founding team, with their qualifications and experience, remains pivotal in shaping a venture's potential for success.
      </p>
      <p>
        In our pursuit of impact-driven investments, alignment with our overarching objectives and mission is non-negotiable. We place a premium on ventures that exhibit a strong focus on sustainability and responsible practices, recognizing their capacity to create lasting change. Our thesis hinges on agile investment, assessing market dynamics, growth potential, and target audience analysis at the speed of opportunity. These criteria reflect our commitment to fostering innovation, sustainability, and ethical responsibility in the ventures we support. Together, we aim to not only fuel growth but also drive meaningful change, shaping a future where innovation, sustainability, and profitability coalesce.
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
  button{
    background:$test-color-5;
  }
</style>