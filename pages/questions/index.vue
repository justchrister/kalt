<template>
  <div class="PageWrapper">
    <navbar :pageTitle="pagename" />
    <div class="page">
      <div class="section">
        <ContentList path="/questions" v-slot="{ list }">
            <nuxt-link :to="article._path" v-for="article in list" :key="article._path" >
              {{ article.title }}
            </nuxt-link>
        </ContentList>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  const pagename = 'Questions';
  const title = 'Kalt — ' + pagename;
  const description = ref('My App Description')

  useHead({
    title,
    meta: [
      {
        name: "description",
        content: description,
      },
    ],
  });
</script>
<style scoped>
a{
  display:block;
  text-decoration:none;
  font-size:150%;
  width:100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom:20px;
  padding-bottom:10px;
  border-bottom:1px solid black;
}
a:hover{
  padding-bottom:9px;
  border-bottom:2px solid black;

}
</style>