<template>
  <main>
    <block>
      <chat-question>
        How does Kalt make money?
      </chat-question>
      <chat-answer>
        When you invest, we take a fee between 0.5% and 3%.
      </chat-answer>
      <chat-answer>
        This is to cover payment processing fees. 
      </chat-answer>
      <chat-answer>
        When we deliver results above the market average, we take a 20% fee.
      </chat-answer>
      <chat-question to="/how-we-calculate-market-average">
        what is the market average?
      </chat-question>
      <chat-answer>
        It's the average return of all investments in the stock market. Also called a "global index fund".
      </chat-answer>
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
      content: 'Invest in the future, today.'
    }]
  })

  useSeoMeta({
    title: 'What is a direct dividend fund?',
    ogTitle: 'Kalt — What is a direct dividend fund?',
    description: 'Explaining how the Kalt direct dividend funds™ are different from normal funds.',
    ogDescription: 'Explaining how the Kalt direct dividend funds™ are different from normal funds.',
    ogImage: 'https://ka.lt/images/meta-questions.png'
  })
</script>