
<template>
  <main>
    <navbar :pageTitle="pagename" />
    <div class="page">
      <div class="section">
        <navbar-tabs/>
        <notification 
          from="Caleb — COO" 
          date="20.03.2023"
          title="We just launched another site!"
          emoji="☀️"/>
        <notification 
          from="Sarah — Your customer rep" 
          date="01.02.2023"
          title="Awesome. You've already earned 200$ so far this year!"
          emoji="😯"/>
        <notification 
          from="Christer — CEO" 
          date="01.01.2023"
          title="Happy new year!"
          emoji="😊"/>
        <notification 
          from="Christer — CEO" 
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