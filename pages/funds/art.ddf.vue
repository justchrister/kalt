<template>
  <main>
    <block>
      <intro-fund text="The art fund invests in high quality blue- and red-chip art from a variety of artists around the world — with clear set of criteria for picking the artworks and artists we invest in."/>
    </block>
    <block>
      <criteria-list>
        <criteria :nr="1">
          The artist has a strong expression, and is aesthetical.
        </criteria>
        <criteria :nr="2">
          The artist has already exhibited in more than 3 countries.
        </criteria>
        <criteria :nr="3">
          The artist is represented by a gallery that has a reputation for quality.
        </criteria>
        <criteria :nr="3">
          The art has seen a 15%+ average increase in value.
        </criteria>
      </criteria-list>
    </block>
    <block>
      <button> invest now -> </button>
    </block>
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
      content: 'Make money, make a difference.'
    }]
  })
  
</script>
<style scoped lang="scss">
  
</style>