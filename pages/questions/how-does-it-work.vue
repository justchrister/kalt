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
        Based on your selection we invest in a variety of different assets, including art, solar panels, small businesses,
        and more.
      </chat-answer>
      <chat-link to="/funds/your">
        build your own fund today
      </chat-link>
      <chat-question>
        How much money can I expect to earn?
      </chat-question>
      <chat-answer>
        Of course it will vary, but our aim is to beat the market by 2x, meaning a 20% return on a yearly basis
      </chat-answer>
      <chat-answer>
        That means, if you auto-invest 150,- every month, you will have 47 000,- in ten years
      </chat-answer>
      <chat-link to="/invest/auto">
        set up auto-investments today
      </chat-link>
      <chat-link to="/questions/compound-interest">
        learn more about compound interest
      </chat-link>
      <chat-question>
        How often can I earn money?
      </chat-question>
      <chat-answer>
        That also varies, but we aim to pay out dividends on a daily basis
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
  useSeoMeta({
    title: 'How does Kalt work?',
    ogTitle: 'Kalt — How does Kalt work?',
    description: 'Explaining how Kalt works and what makes us different.',
    ogDescription: 'Explaining how Kalt works and what makes us different.',
    ogImage: 'https://ka.lt/images/meta-questions.png'
  })
</script>