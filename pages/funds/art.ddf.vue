<template>
  <main>
    <intro title="Art fund" paragraph="Invest in an index of high quality art from a variety of artist around the world" />
    <block>
      <h2>What is the Art fund?</h2>
      <p>The Art fund is an index of high quality art from a variety of artist around the world. The fund is curated by a team of tastemakers. The art is selected based on three criteria:</p>
      <ol>
        <li>
          The artist has a strong expression.
        </li>
        <li>
          The artist has already exhibited in more than 3 countries.
        </li>
        <li>
          The artist is represented by a gallery that has a reputation for quality.
        </li>
      </ol>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'gi.ddf'
  })
  useHead({
    title: 'gi.ddf',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })
  
</script>
<style scoped lang="scss">
main{ padding-top:0; }
ol{
  margin:$clamp-1 0;
  list-style: decimal-leading-zero;
}
li{
  margin:$clamp-0-5 $clamp-5;
  &::marker{
    font-size:85%;
    font-family:$monospace;
  }
}
</style>