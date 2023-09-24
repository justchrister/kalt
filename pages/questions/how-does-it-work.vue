<template>
  <main>
    <block>
      <chat-question>
        How does Kalt work?
      </chat-question>
      <chat-answer>
        U make money
      </chat-answer>
      <chat-link to="/invest">
        invest now
      </chat-link>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'How does it work?'
  })
  useHead({
    title: 'How does it work?',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })
  
</script>
<style scoped lang="scss">
  
</style>