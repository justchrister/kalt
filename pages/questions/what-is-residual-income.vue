<template>
  <main>
    <block>
      <chat-question>
        What is residual income?
      </chat-question>
      <chat-answer>
        Residual income is money that keeps coming in even after you've done the initial work.
      </chat-answer>
      <chat-answer>
        Investing in solar energy for instance is a great way to get some of that sweet residual income. You earn money
        from the electricity it generates.
      </chat-answer>
      <chat-answer>
        And the best part?
      </chat-answer>
      <chat-answer>
        This income keeps coming in for years, giving you a long-term and predictable stream of cash flow.
      </chat-answer>
      <chat-link to="/invest">
        invest now
      </chat-link>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'What is residual income?'
  })
  useHead({
    title: 'What is residual income?',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
</script>