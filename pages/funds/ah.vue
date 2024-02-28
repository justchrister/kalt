<template>
  <main>
    <intro title="Combat housing inequality, through our fund." />
    <block margin="half" :border="true">
      <h3>The fund strategically allocates capital in development of affordable housing around the world. In locations
        that yield a stable return on the investments, but also contributes to social good by combating housing
        inequality. All based on a set of criteria. </h3>
    </block>
    <block margin="half">
      <criteria-list>
        <criteria :nr="1">
          In a location with demand for affordable housing.
        </criteria>
        <criteria :nr="2">
          The project must hacve clear indicators of future returns.
        </criteria>
        <criteria :nr="3">
          Must have measurable positive impact the community.
        </criteria>
        <criteria :nr="4">
          Should include communal social spaces for residents to socialize and engage.
        </criteria>
        <criteria :nr="5">
          Projects should aligning with our broader sustainability goals.
        </criteria>
      </criteria-list>
    </block>
    <block margin="half">
      <h2>The thesis</h2>
      <p>
        In the cities of tomorrow, affordable and quality housing will be critical. As more people move into urban areas,
        the need for accessible housing is set to rise sharply. This kind of development is key to a city's growth,
        ensuring that everyone, regardless of income, has a place to call home. This isn't just about planning for
        numbers, but nurturing community spirit and diversity that make cities special and liveable.
      </p>
      <p>
        Affordable housing also means thinking about the environment and the economy. It encourages energy-efficient
        living, lessens the impact on the environment, and keeps key workers living close to their jobs. Creating spaces
        where neighbors can connect and support each other turns housing into communities, laying the groundwork for
        cities that can face the future with confidence.
      </p>
      <p>
        Affordable housing stands as a solid investment opportunity. Its essence as a fundamental need provides a constant
        demand, offering a buffer against market volatility and ensuring a stable return on investment. In an economic
        landscape that is often unpredictable, the affordable housing market offers a unique combination of social impact
        and financial prudence. The demand increases during volatile times.
      </p>
      <p>
        As we build these homes, we must blend innovation with compassion. Tomorrow's affordable housing should be
        synonymous with lasting quality and respect for the environment, embracing smart technology and sustainable
        design. This isn't just building for shelter, but carefully crafting the backdrop of everyday life for a thriving
        city. It's a commitment to a future where everyone has a stake in their community and the urban environment as a
        whole.
      </p>
      <input-button link="/invest">invest now -></input-button>
    </block>
    <!-- insert map here -->
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Affordable housing'
  })

  useSeoMeta({
    title: 'Affordable housing',
    ogTitle: 'Affordable housing',
    description: 'The fund strategically allocates capital in development of affordable housing around the world. In locations that yield a stable return on the investments, but also contributes to social good by combating housing inequality. All based on a set of criteria.',
    ogDescription: 'The fund strategically allocates capital in development of affordable housing around the world. In locations that yield a stable return on the investments, but also contributes to social good by combating housing inequality. All based on a set of criteria.',
    ogImage: 'https://ka.lt/images/meta-funds-housing.png'
  })

</script>
<style scoped lang="scss">
  main {
    padding-top: 0;
  }
</style>