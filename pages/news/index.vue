<template>
  <main>
    <intro title="News"
    paragraph="Stay updated and follow our progress towards a new cool thing."/>
    <block>
      <ContentList path="/news" v-slot="{ list }">
          <nuxt-link :to="article._path" v-for="article in list" :key="article._path" >
            {{ article.title }}
          </nuxt-link>
      </ContentList>
    </block>
  </main>
</template>
<script setup>
  definePageMeta({
    pagename: 'News'
  })
  useHead({
    title: 'News'
  })
</script>
<style scoped lang="scss">
  main{padding-top:0;}
  main a{
    display:block;
    text-decoration:none;
    font-size:150%;
    width:100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom:$clamp-2;
    padding-bottom:$clamp;
    border-bottom:1px solid black;
  }
</style>