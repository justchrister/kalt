<template>
  <main>
    <block margin="half">
      <intro-fund ticker="art" text="The art fund invests in high quality blue- and red-chip art from a variety of artists around the world — with clear set of criteria for picking the artworks and artists we invest in."/>
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
      By investing in the art fund you can own a piece of all our artworks, and enjoy the benefits of a diversified portfolio of art.
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

</style>