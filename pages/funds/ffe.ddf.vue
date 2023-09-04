<template>
  <main>
    <block margin="half">
      <intro-fund text="The Fossil-free energy invests in high quality blue- and red-chip art from a variety of artists around the world — with clear set of criteria for picking the artworks and artists we invest in."/>
    </block>
    <block>
      <criteria-list>
        <criteria :nr="1">
          The area must have high growth potential.
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