<template>
  <div class="PageWrapper values">
    <navbar :pageTitle="pagename" />
    <div class="headline">
      <h1>Our Values —</h1>
    </div>
    <div class='page'>
      <div class="section">
        <div class="block">
          <h1>Build a new society </h1>

        </div>
        <Cta />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const pagename = 'Values';
const title = 'Kalt — ' + pagename;
const description = ref('My App Description')

useHead({
  title,
  meta: [{
    name: 'description',
    content: description
  }]
})
</script>