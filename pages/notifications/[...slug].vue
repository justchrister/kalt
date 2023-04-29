<template>
  <main class="page-wrap notification">
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
    pagename: 'Notification',
    layout: 'focused',
    middleware: 'auth'
  })
  useHead({
    title: 'Notification'
  })
</script>
<style lang="scss">
main.notification h1{
  font-family:$sans-serif;
}
</style>