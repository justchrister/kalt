<template>
  <main>
    <block margin="half">
      <intro ticker="ffe" text="The fossil-free energy fund invests in energy generating infrastructure, in high impact geographies, low current supply, and high projected growth-by "/>
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
      <input-button link="/invest">invest now -></input-button>
      <select-fund />
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
.button-group{
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: sizer(1);
}

</style>