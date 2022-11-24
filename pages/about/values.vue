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

<template>
  <div class="PageWrapper">
    <Kaltmenu :pageTitle="pagename" />
    <div class='page'>
      <div class="section">
        <div class="block">
        </div>
        <Cta />
      </div>
    </div>
  </div>
</template>
