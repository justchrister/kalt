<template>
  <main>
    <intro title="Accelerate the global transition to fossil-free energy sources" />
    <block margin="half" :border="true">
      The fossil-free energy fund invests in high yield and growth fossil-free energy infrastructure all around the world — with clear set of criteria for picking the locations we invest in."
    </block>
    <block margin="half">
      <criteria-list>
        <criteria :nr="1">
          Proximity to major energy demand centers, or with high GDP growth potential.
        </criteria>
        <criteria :nr="2">
          The geographical area must have high energy generation potential.
        </criteria>
        <criteria :nr="3">
          The country must have moderate to low political risk.
        </criteria>
        <criteria :nr="4">
          Supportive regulatory framework for renewable energy.
        </criteria>
        <criteria :nr="5">
          Adequate infrastructure for transportation and grid connectivity.
        </criteria>
      </criteria-list>
    </block>
    <block>
      <h2> The thesis </h2>
      <p>
        In a world confronting a pressing climate crisis and an escalating call for sustainable solutions, our vision
        transcends conventional investment paradigms. We envision a future where fossil-free energy investment acts as a
        catalyst for magnifying impact—an impact that not only generates financial returns but also propels positive
        change to new heights.
      </p>
      <p>
        Fossil-free energy assets stand as a potent conduit for this amplification of impact. They symbolize an unwavering
        commitment to a cleaner, greener, and more sustainable world. This journey towards a sustainable energy landscape
        is characterized by innovation, resilience, and the steadfast belief that our investments can be a driving force
        for global good.
      </p>
      <p>
        By participating in our fossil-free energy fund, you become an integral part of this transformative journey. Each
        investment not only promises financial growth but also contributes to the magnification of impact—a future where
        the positive influence on the environment, communities, and economies resonates far beyond the sum of its parts.
      </p>
      <p>
        Incorporating fossil-free energy investments into your portfolio isn't just a strategic move; it's a declaration
        of purpose. It's an opportunity to lead the way in impact investing, where the effects of your investments ripple
        outward, creating a wave of positive change that reverberates globally. Together, we can accelerate the transition
        to a world powered by clean, renewable sources, where every investment adds value and amplifies impact for a
        brighter and more sustainable future.
      </p>
      <input-button link="/invest">invest now -></input-button>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Energy'
  })
  
  useSeoMeta({
    title: 'Fossil-free energy',
    ogTitle: 'Kalt - Fossil-free energy',
    description: 'The fossil-free energy fund invests in high yield and growth fossil-free energy infrastructure all around the world — with clear set of criteria for picking the locations we invest in.',
    ogDescription: 'The fossil-free energy fund invests in high yield and growth fossil-free energy infrastructure all around the world — with clear set of criteria for picking the locations we invest in.',
    ogImage: 'https://ka.lt/images/meta-funds-energy.png'
  })
</script>
<style scoped lang="scss">
  main {
    padding-top: 0;
  }
</style>