<template>
  <main>
    <intro title="Open positions"
    paragraph="We are always looking for talented individuals, both with and without a traditionaal education and previous work experience."/>
    <block>
      <ContentList path="/jobs" v-slot="{ list }">
          <nuxt-link :to="article._path" v-for="article in list" :key="article._path" >
            {{ article.title }}
          </nuxt-link>
      </ContentList>
    </block>
  </main>
</template>
<script setup>
  definePageMeta({
    pagename: 'Questions',
    middleware: 'default'
  })
  useHead({
    title: 'Questions'
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
  /*
  .dark-mode main a{
    border-color:$light;
  }
  */
</style>