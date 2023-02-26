
<template>
  <main>
    <navbar :pageTitle="pagename" />
    <div class="page">
      <div class="section">
        <navbar-tabs/>
        <notification 
          from="Christer — CEO and Founder @ Kalt" 
          date="11.12.2022"
          title="Welcome to the Kalt Club!"
          emoji="☀️"/>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
    const pagename = 'Transactions';
    const title = 'Kalt — ' + pagename;
    const description = ref('My App Description')

    useHead({
      title,
      meta: [{
        name: 'description',
        content: description
      }]
    })
  definePageMeta({
    middleware: 'auth'
  })
</script>