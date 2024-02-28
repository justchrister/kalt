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
  useSeoMeta({
    title: 'How does Kalt make money?',
    ogTitle: 'Kalt — How does Kalt make money?',
    description: 'Explaining our fee structure.',
    ogDescription: 'Explaining our fee structure.',
    ogImage: 'https://ka.lt/images/meta-questions.png'
  })
</script>