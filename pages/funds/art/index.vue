<template>
  <main>
    <intro-fund title="Invest in art from the most famous artists in the world." gradient="3"/>
    <block margin="half">
      <intro-block-fund text="The art fund invests in high quality blue- and red-chip art from a variety of artists around the world — with clear set of criteria for picking the artworks and artists we invest in."/>
    </block>
    <block margin="half">
      <criteria-list>
        <criteria :nr="1">
          The artist has a strong expression, and is aesthetical.
          The artist's work is aesthetically strong and expressive.
        </criteria>
        <criteria :nr="2">
          The artist has international recognition, exhibited in at least 3 countries.
        </criteria>
        <criteria :nr="3">
          Represented by a reputable gallery.
        </criteria>
        <criteria :nr="3">
          Comparable art has appreciated by 15% or more in value.
        </criteria>
      </criteria-list>
    </block>
    <block margin="half">
      <h2> The thesis </h2>
      <p>
        As wealth concentrates among the affluent, real, touchable luxury assets like art become even more lucrative. Art by iconic artists like Monet, Basquiat, and Picasso are rare, adding a built-in value that stands the test of time. 
      </p>
      <p>
        With our proprietary quantitive model for investing in art, based on historic appreciation as well as seemingly subjective characteristics of the specific artworks (made objective by AI). 
      </p>
      <p>
        By investing in our art fund, you're not just buying into art; you're securing a share in a well-researched, diversified portfolio of timeless works. It's not just about financial growth—it's about becoming part of a legacy of value, in a market that's traditionally less volatile than stocks and bonds.
      </p>
      <button @click="navigateTo('/invest')"> invest now -> </button>
    </block>
    <block>
      <h2>The art</h2>
      <artwork 
        title="All colored cast, part II"
        artist="Jean-Michel Basquiat"
        image="/art/jean-michel-basquiat/all-coloured-cast-ii-mockup.webp"
      />
      <artwork 
        title="Untitled"
        artist="Nicolas Party"
        image="/art/nicolas-party/untitled-mockup.webp"
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
  main{
    padding-top:0;
  }
</style>