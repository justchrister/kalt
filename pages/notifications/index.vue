<template>
  <main>
    
    <div class="page">
      <navbar-tabs/>
      <div class="block">
        <ContentList path="/notifications" v-slot="{ list }">
            <nuxt-link :to="article._path" v-for="article in list" :key="article._path" >
              <notification 
                :from="article.byline" 
                :date="article.date"
                :title="article.title"/>
            </nuxt-link>
        </ContentList>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
  const pagename = 'Notifications';
  const title = 'Kalt — ' + pagename;

  useHead({
    title,
    meta: [{
      name: 'description',
      content: "Make money, make a difference."
    }]
  })
  definePageMeta({
    middleware: 'auth'
  })
</script>
<style scoped>
  .intro{
    background: #1E96FC;
  }
</style>