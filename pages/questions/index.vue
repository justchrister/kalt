<template>
  <main>
    <intro title="Questions and answers"
    paragraph="Here we try to answer some questions you might have, in simple to understand."/>
    <block>
      <ContentList path="/questions" v-slot="{ list }">
          <nuxt-link :to="article._path" v-for="article in list" :key="article._path" >
            {{ article.title }}
          </nuxt-link>
      </ContentList>
    </block>
  </main>
</template>
<script setup>
  definePageMeta({
    pagename: 'Questions'
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
  .dark-mode main a{
    border-color:$light;
  }
</style>