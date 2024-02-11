<template>
  <main>
    <block>
      <chat-question>
        What does affordable housing mean?
      </chat-question>
      <chat-answer>
        We look at it in two ways
      </chat-answer>
      <chat-answer>
        Based on low-to-moderate incomes
      </chat-answer>
      <chat-answer>
        Affordable housing in this context is typically defined as housing that is reasonably priced for people with incomes falling within the area's median income. This involves calculating housing costs, including rent, utilities, taxes, etc. that do not exceed a certain percentage of the household's income, around 30%.
      </chat-answer>
      <chat-answer>
        Lower 15th percentile in m² rental prices.
      </chat-answer>
      <chat-answer>
        Here we define affordable housing based on the rental prices in a specific area. By focusing on the lower 15th percentile of m² rental prices, we target housing options that are among the most affordable in the market. This method benchmarks affordability against the actual housing market.
      </chat-answer>
      <chat-answer>
        Both methods provide a realistic picture of what is affordable to the lowest-income segment of the population.
      </chat-answer>
      <chat-link to="/invest">
        invest now
      </chat-link>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'What does affordable mean?'
  })
  useHead({
    title: 'What does affordable mean?',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
</script>