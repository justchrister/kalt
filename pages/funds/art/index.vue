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
        </criteria>
        <criteria :nr="2">
          The artist has already exhibited in more than 3 countries.
        </criteria>
        <criteria :nr="3">
          The artist is represented by a gallery that has a reputation for quality.
        </criteria>
        <criteria :nr="3">
          Comparitive art has seen a 15%+ average increase in value.
        </criteria>
      </criteria-list>
    </block>
    <block margin="half">
      <h2> The thesis </h2>
      <p>Art is not just an emotional investment, it's a financial one too. Pieces by iconic artists like Monet or Picasso are rare, adding a built-in value that stands the test of time. In an era where wealth is growing for the affluent, their appetite for tangible and meaningful assets like art is becoming increasingly clear.</p>
      <p>Art offers something unique: it's not only a financial asset but also a status symbol and a source of emotional enrichment. The growing demand from wealthy investors is a key factor that's likely to push the value of art even higher.</p>
      <p>Including art in your investment portfolio is not just a wise choice, but a forward-thinking strategy. Unlike traditional financial assets like stocks and bonds, art adds a dimension of tangible ownership and emotional engagement that's unmatched.</p>
      <p>By investing in the art fund you can own a piece of all the artworks in our portfolio, and enjoy the benefits of a diversified portfolio of art.</p>
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
  button{
    background:$test-color-5;
  }
</style>