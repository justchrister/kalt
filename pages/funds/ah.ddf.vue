<template>
  <main>
    <block margin="half">
      <intro-fund ticker="art" text="The fund strategically allocates capital in development of affordable housing around the world. By doing so, we yield a stable return on the investments, but also contributes to social good by combating housing inequality."/>
    </block>
    <block margin="2">
      <criteria-list>
        <criteria :nr="1">
          The project should be in a location with demand for affordable housing, supported by demographic and economic data.
        </criteria>
        <criteria :nr="2">
          The project must hacve clear indicators that it is likely to provide a stable or growing yield.
        </criteria>
        <criteria :nr="3">
          Must have measurable positive impact the community and include communal social spaces for residents to socialize and engage.
        </criteria>
        <criteria :nr="4">
          Should include communal social spaces for residents to socialize and engage.
        </criteria>
        <criteria :nr="5">
          Preference is given to projects that aligning with our broader sustainability goals.
        </criteria>
      </criteria-list>
    </block>
    <block margin="2">
      The Affordable Housing Fund by Kalt strategically allocates capital to development projects around the world. Our focus is fourfold: invest in areas with high demand for affordable housing, seek projects that offer stable or growing yields, prioritize eco-friendly initiatives, and aim for a strong social impact that includes communal spaces for community engagement. By aligning with these criteria, we not only secure a stable return on investments but also contribute to social good by combating housing inequality.
    </block>
    <block>
      <div class="button-group">
        <button @click="navigateTo('/subscription')"> auto investments -> </button>
        <button @click="navigateTo('/invest')"> invest now -> </button>
      </div>
      <select-fund />
    </block>
    <!-- insert map here -->
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Art fund'
  })
  useHead({
    title: 'Art fund',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
  
</script>
<style scoped lang="scss">
  .button-group{
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: $clamp-1;
  }
</style>