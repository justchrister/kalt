<template>
  <main>
    <navbar-tabs/>
    <block>
      <ContentList path="/notifications" v-slot="{ list }">
          <nuxt-link :to="article._path" v-for="article in list" :key="article._path" >
            <notification 
              :from="article.byline" 
              :date="article.date"
              :title="article.title"/>
          </nuxt-link>
      </ContentList>
    </block>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Notifications',
    middleware: 'auth'
  })
  useHead({
    title: 'Kalt — Notifications',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })
</script>
<style scoped>
  .intro{
    background: #1E96FC;
  }
</style>