<template>
  <main>
    <block>
      <chat-question>
        How does compound interest work?
      </chat-question>
      <chat-answer>
        Compound interest is a powerful financial concept that allows your money to grow more and more over time. When you
        invest, what you earn on that investment is added to the original investment, making it larger. This larger
        investment then earns even more in the next period, and so on.
      </chat-answer>
      <chat-answer>
        This process repeats itself, causing the interest earned to become larger and larger, faster and faster. The
        longer the investment is left to grow, the greater the impact of compound interest will be. This is why we
        automatically re-invest for you.
      </chat-answer>
      <chat-link to="/invest">
        invest now
      </chat-link>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Compound interest?'
  })
  useSeoMeta({
    title: 'How does compound interest work?',
    ogTitle: 'Kalt — How does compound interest work?',
    description: 'Explaining why compound interest is so important when building wealth.',
    ogDescription: 'Explaining why compound interest is so important when building wealth.',
    ogImage: 'https://ka.lt/images/meta-questions.png'
  })
</script>