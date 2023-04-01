<template>
  <main class="notification">
    <block>
      <ContentDoc>
        <template #not-found>
          <not-found />
        </template>
      </ContentDoc>
    </block>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Question',
    layout: 'questions'
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