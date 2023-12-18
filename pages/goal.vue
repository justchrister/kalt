<template>
  <main>
    <block>
      <span>ONE MISSION, THREE GOALS </span>
      <h1>To redifine impact investing.</h1>
    </block>
    <block>
      <span> GOAL 1 </span><span class="hide">—</span>
      <h2>2x market returns</h2>
      <p>Without performance, an investment is merely a donation, is our guiding principle. We aim to give twice the returns that you would get by investing in an index fund. Our strategy is designed to create a powerful synergy between financial gain and impactful change. Your investments do more than grow — they thrive.</p>
    </block>
    <block>
      <span> GOAL 2 </span><span class="hide">—</span>
      <h2>Compound the impact</h2>
      <p>The positive environmental and societal impact should grow over time, its not a one-off investment, it should compound. The true measure of an investment lies not just in its financial returns but in its capacity to effect positive change. Our approach is to enhance the impact of every dollar invested. By focusing on sectors like blue-chip art, renewable energy, affordable housing, and impactful venture capital, we ensure that investments grow in both value and societal contribution.</p>
    </block>
    <block>
      <span> GOAL 3 </span><span class="hide">—</span>
      <h2>Make it transparent</h2>
      <p>Promising returns twice as high as the market, while delivering positive impact worldwide are two very big promises, which makes transparency fundamental to what we do. It's vital that you see and understand the impact of your investments. Our commitment is to provide clear, comprehensive updates that details both financial performance and the real-world impact. This way, you are not only informed but can also appreciate the broader significance of your financial decisions. </p>
    </block>
  </main>
</template>
<script lang="ts" setup>
definePageMeta({
  pagename: 'Goal'
})
  useHead({
    title: 'Goal',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
  
</script>
<style scoped lang="scss">
  span{
    font-size: $clamp-1-5;
    font-weight: 600;
    color: $dark-80;
  }
  span.hide{
    opacity:0;
  }
</style>