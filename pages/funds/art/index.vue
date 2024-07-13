<template>
  <main>
    <intro title="Invest in art from the most famous artists in the world."/>
    <block margin="half" :border="true">
      The art fund invests in high quality blue- and red-chip art from a variety of artists around the world — with
        clear set of criteria for picking the artworks and artists we invest in. 
    </block>
    <block margin="half">
      <criteria-list>
        <criteria :nr="1">
          The artist has a strong aesthetical expression
        </criteria>
        <criteria :nr="2">
          The artist has international recognition: exhibited in at least 3 countries
        </criteria>
        <criteria :nr="3">
          Represented by a reputable gallery
        </criteria>
        <criteria :nr="4">
          Comparable art has appreciated by 30% or more in value.
        </criteria>
      </criteria-list>
    </block>
    <block margin="half">
      <h2> The thesis </h2>
      <p>
        As wealth becomes more concentrated among the wealthy, luxury assets like art are becoming increasingly lucrative. Iconic works by artists such as Monet, Basquiat, and Picasso are rare and have a lasting value.
      </p>
      <p>
        Using our unique quantitative model, we can predict how the value of art will increase over time. The machine learning model<omoji emoji="✨" />, analyzes both historical trends and specific characteristics of each artwork.
      </p>
      <p>
        When you invest in our art fund, you’re not just buying art; you’re securing a stake in a carefully curated, diverse collection of timeless pieces. This isn’t just about growing your wealth—it’s about becoming part of a lasting legacy in a market that tends to be more stable than stocks and bonds.
      </p>
      <input-button link="/invest">invest now -></input-button>
    </block>
    <block>
      <h2>The art</h2>
      <artwork title="All colored cast, part II" artist="Jean-Michel Basquiat"
        image="/images/art/jean-michel-basquiat/all-coloured-cast-ii-mockup.webp" />
      <artwork title="Untitled" artist="Nicolas Party" image="/images/art/nicolas-party/untitled-mockup.webp" />
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Art fund'
  })
  useSeoMeta({
    title: 'Art fund',
    ogTitle: 'Kalt - Art fund',
    description: 'The art fund invests in high quality blue- and red-chip art from a variety of artists around the world — with clear set of criteria for picking the artworks and artists we invest in.',
    ogDescription: 'The art fund invests in high quality blue- and red-chip art from a variety of artists around the world — with clear set of criteria for picking the artworks and artists we invest in.',
    ogImage: 'https://ka.lt/images/meta-funds-art.png'
  })
</script>
<style scoped lang="scss">
  main {
    padding-top: 0;
  }
</style>
