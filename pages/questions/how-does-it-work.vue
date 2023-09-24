<template>
  <main>
    <block>
      <chat-question>
        How does this website work?
      </chat-question>
      <chat-answer>
        You build your own fund by choosing what matters to you. 
      </chat-answer>
      <chat-image url="/images/gifs/your-fund.gif">
      </chat-image>
      <chat-answer>
        Just adjust on a scale from one to three hearts
      </chat-answer>
      <chat-answer>
        We invest in a variety of different assets, including art, solar panels, small businesses, and more. 
      </chat-answer>
      <chat-link to="/invest">
        invest now
      </chat-link>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'How does it work?',
    layout:'focused'
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