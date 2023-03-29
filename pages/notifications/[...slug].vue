<template>
  <div class="page-wrap notification">
    <ContentDoc>
      <template #not-found>
        <not-found />
      </template>
    </ContentDoc>
  </div>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Notification',
    middleware: 'auth'
  })
  useHead({
    title: 'Kalt — Notification',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })
</script>
<style lang="scss">
.page-wrap.notification h1{
  font-family:$sans-serif;
}
</style>