<template>
  <main>
    <block margin="half">
      <intro-fund ticker="art" text="The fund strategically allocates capital in development of affordable housing around the world. By doing so, we yield a stable return on the investments, but also contributes to social good by combating housing inequality."/>
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