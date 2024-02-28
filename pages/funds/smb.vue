<template>
  <main>
    <intro title="Invest in the fundament of all economies and communities." />
    <block margin="half" :border="true">
      <h3>The small business fund offers a unique opportunity to invest in the backbone of global economies and local communities — small businesses. We apply a rigorous selection process, identifying companies with business models designed for profitability and a committed leadership. </h3>
    </block>
    <block margin="half">
      <criteria-list>
        <criteria :nr="1">
          A business model designed for profitability.
        </criteria>
        <criteria :nr="2">
          Strong financial track record with effective management
        </criteria>
        <criteria :nr="3">
          Must have been operational for at least 3 years
        </criteria>
        <criteria :nr="4">
          A committed and diverse leadership team
        </criteria>
        <criteria :nr="5">
          Clear understanding of their market niche and customer base
        </criteria>
      </criteria-list>
    </block>
    <block margin="half">
      <h2> The thesis </h2>
      <p>
        The cozy café where you grab your morning coffee, the electrician where your cousin was an apprentice, or the family-owned restaurant where you celebrate special occasions. These aren't just businesses; they're the cornerstones of our communities, and the bedrock of the global economy. These small businesses adapt to any crisis and keep our local communities vibrant and thriving.
      </p>
      <p>
        As AI and automation make efficiency in large corporations more important, they will end up consolidating further and further. Small businesses will not reap the benefits of these technologies as their scale is too small, but they compete on service and experience. This is where the fund comes in. We make it more efficient for small businesses to run and act as a safety net for the resilient.
      </p>
      <p>
        We either lend small businesses money, offer convertible loans, or buy parts of the business; we do not dictate the strategy but enable the business owners to focus on running and growing their business.
      </p>
      <p>
        When we pick businesses to invest in, we look for ones that have been doing well for a while and really understand the people they serve and what makes them special. This is not just about making money. It's about putting our money into the businesses that make our towns and cities better places to live.
      </p>
      <input-button link="/invest">invest now -></input-button>
    </block>
    <!-- insert map with locations -->
    <block>
      <select-fund />
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Small business'
  })

  useSeoMeta({
    title: 'Small business',
    ogTitle: 'Small business',
    description: 'The small business fund offers a unique opportunity to invest in the backbone of global economies and local communities — small businesses. We apply a rigorous selection process, identifying companies with business models designed for profitability and a committed leadership.',
    ogDescription: 'The small business fund offers a unique opportunity to invest in the backbone of global economies and local communities — small businesses. We apply a rigorous selection process, identifying companies with business models designed for profitability and a committed leadership.',
    ogImage: 'https://ka.lt/images/meta-funds-small-business.png'
  })

</script>
<style scoped lang="scss">
  main {
    padding-top: 0;
  }
</style>
