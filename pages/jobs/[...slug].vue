<template>
  <main class="candidate">
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
    pagename: 'Candidate'
  })
  useHead({
    title: 'Candidate',
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