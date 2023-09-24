<template>
  <main>
    <block>
      <chat-question>
        How does Kalt make money?
      </chat-question>
      <chat-answer>
        When you invest, we take a 4% fee. 
      </chat-answer>
      <chat-answer>
        When you make money, we take a 12% fee. 
      </chat-answer>
      <chat-link to="/invest">
        invest now
      </chat-link>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'How does Kalt make money?'
  })
  useHead({
    title: 'How does Kalt make money?',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })
  
</script>
<style scoped lang="scss">
  
</style>