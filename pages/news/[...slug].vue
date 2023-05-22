<template>
  <main class="news-article">
    <block>
      <ContentDoc>
        <template #not-found>
          <not-found />
        </template>
      </ContentDoc>
    </block>
  </main>
</template>
<script setup>
  definePageMeta({
    pagename: 'News'
  })
  useHead({
    title: 'News'
  })
</script>
<style lang="scss">

</style>
