<template>
  <main class="notification">
    <div class="block">
      <ContentDoc>
        <template #not-found>
          <not-found />
        </template>
      </ContentDoc>
    </div>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Question',
    layout: 'focused',
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
main.notification h1{
  font-family:$sans-serif;
}
</style>