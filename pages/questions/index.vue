<template>
  <main>
    <intro title="Questions and answers"
      paragraph="Here we try to answer some questions you might have, in simple to understand." />
    <block>
      <chat-link to="/questions/how-does-it-work?">
        How does it work?
      </chat-link>
      <chat-link to="/questions/ddf?">
        What is a direct dividend fund?
      </chat-link>
      <chat-link to="/questions/how-do-you-make-money">
        How does Kalt make money?
      </chat-link>
      <chat-link to="/questions/what-is-residual-income?">
        What is residual income?
      </chat-link>
      <chat-link to="/questions/compound-interest?">
        How does compound interest work?
      </chat-link>
    </block>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Questions'
  })
  useSeoMeta({
    title: 'Your questions answered',
    ogTitle: 'Kalt — Your questions answered',
    description: 'We have compiled a list of the most common questions and answered them in an easy to read format.',
    ogDescription: 'We have compiled a list of the most common questions and answered them in an easy to read format.',
    ogImage: 'https://ka.lt/images/meta-questions.png'
  })
</script>
<style scoped lang="scss">
  main {
    padding-top: 0;
  }
</style>