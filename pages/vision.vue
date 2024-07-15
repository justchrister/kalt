<template>
  <main>
    <block width="extra-wide" padding="5" video="/videos/vision-min.mp4">
      <h1><span>Building</span> <span>the</span> <span>next</span> <span>era</span> <span>of</span> <span>capitalism</span><span>,</span> <span>with</span> <span>a</span> <span>goal</span> <span>beyond</span> <span>financial</span> <span>growth</span><span>.</span>
      </h1>
    </block>
    <block>
      <p>
        The only way to have actual lasting impact is to use market forces to drive a change. The issues we are facing
        require a lot of funding, and the only way to allocate the adequate capital, is if that capital actually gives a
        return on investment.
      </p>
      <p>
        To guide us towards this improved future, we work in a methodical and structured way. We have defined three goals
        that we believe are the most important to achieve our shared mission and broader vision for a more sustainable
        future.
      </p>
    </block>
    <block>
      <pill-next color="primary"> Vision </pill-next>
      <h2> Building the new era of capitalism, with a goal beyond financial growth.</h2>
    </block>
    <block>
      <pill-next color="primary"> Mission </pill-next>
      <h2> Redefine impact investing </h2>
      <p>
        We want to empower individuals to maximize their positive impact on the world. By providing accessible investment
        tools and meaningful investment opportunities. Through innovation and technology, we are building the tools for
        anyone to build a purpose-driven portfolio.
      </p>
    </block>
    <block>
      <pill-next color="primary"> Goal 01 </pill-next>
      <h2> 2x market returns </h2>
      <p>
        Portfolio performance driving impact is our guiding principle. To make investing in a sustainable future
        lucrative, we aim to double the returns of a global index fund.
      </p>
      <p>
        Our strategy is designed to create a powerful synergy between financial gain and impactful change. Through
        investing in real assets, you can build real value — we call it wealth with values.
      </p>
    </block>
    <block>
      <pill-next color="primary"> Goal 02 </pill-next>
      <h2> Impact that grows </h2>
      <p>
        The positive environmental and societal impact has to grow over time. The true measure of an investment lies not
        just in its financial returns but in its capacity to effect positive change. Our approach is to enhance the impact
        of every dollar, euro or yen invested. Planting seeds, not just harvesting returns.
      </p>
    </block>
    <block>
      <pill-next color="primary"> Goal 03 </pill-next>
      <h2> Make it transparent </h2>
      <p>
        Transparency is fundamental when making huge promises. It is vital that you both see and understand the impact of
        your investments. Our commitment is to provide comprehensive and clear updates that detail both financial
        performance and the real-world impact.
      </p>
      <p>
        This way, you are not only informed but can also appreciate the broader significance of your financial decisions.
        This is the biggest difference between Kalt and traditional ESG funds.
      </p>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Vision'
  })
  useSeoMeta({
    title: 'Vision',
    ogTitle: 'Kalt — Vision',
    description: 'Building the next era of capitalism.',
    ogDescription: 'Building the next era of capitalism.',
    ogImage: 'https://ka.lt/images/meta-vision.png'
  })
</script>
<style lang="scss" scoped>
  main{
    padding-top:sizer(8);
  }
  .content{
    bottom:0;
    position:absolute;
    padding:sizer(4);
  }
  h1 {
    margin-top:sizer(1);
    font-size:sizer(3);
    margin:0;
    color:$dark;
    font-weight:500;
  }
  h2{
    margin-top:sizer(0.4);
  }
  @keyframes moveUp {
    0% {
      transform: translateY(0);
      opacity: 0;
    }
    100% {
      transform: translateY(-10px);
      opacity: 1;
    }
  }

  h1 span {
    display: inline-block;
    opacity: 0;
    animation: moveUp 0.5s forwards;
  }
  // Use SCSS loop to apply animation delay
  @for $i from 1 through 25 {
    h1 span:nth-child(#{$i}) {
      animation-delay: 0.08s * $i;
    }
  }
</style>