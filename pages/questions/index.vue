<template>
  <main>
    <navbar :pageTitle="pagename" />
    <div class="intro">
      <div class="block">
        <h3>Questions and answers</h3>
        <p>
          Here we try to answer some questions you might have, in the simplest terms possible. If you have any other questions, feel free to reach out. 
        </p>
        <bomb to="about/contact" text="contact us" />
      </div>
    </div>
    <div class="page">
      <div class="block">
        <ContentList path="/questions" v-slot="{ list }">
            <nuxt-link :to="article._path" v-for="article in list" :key="article._path" >
              {{ article.title }}
            </nuxt-link>
        </ContentList>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
  const pagename = 'Questions';
  const title = 'Kalt — ' + pagename;

  useHead({
    title,
    meta: [{
      name: "description",
      content: "Make money, make a difference."
    }]
  });
</script>
<style scoped>
  .page a{
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
  .page a:hover{
    padding-bottom:9px;
    border-bottom:2px solid black;

  }
  .intro{
    background: #1E96FC;
  }
</style>