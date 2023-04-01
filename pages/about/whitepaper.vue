<template>
  <main>
    <block>
      <nuxt-link to="/"><omoji emoji="←"/> back</nuxt-link>
      <h3>Whitepaper: Accelerating Fossil-Free Energy Growth Through Innovative Investment Solutions </h3>
    </block>
    <block margin="half">
      <h4>Abstract</h4>
      <p>
        The ongoing global energy crisis and the urgent need for accelerated advancement in the fossil-free energy adoption highlights the importance of innovative solutions to combat the devastating effects of climate change and meet increasing energy demands. This whitepaper aims to explore ways in which global financial markets can drive rapid growth in the development, deployment, and adoption of fossil-free energy sources worldwide.
      </p>
      <p>
        We propose the introduction of a new investment instrument designed to incentivize investors to become active stakeholders in their investment. This instrument must enable rapid deployment and scaling of renewable energy sites globally, create liquidity in investments that traditionally require capital lock-up for years, and transparency as a core characteristic.
      </p>
      <p>
        To support this investment instrument, the energy infrastructure must be designed for easy and rapid scalability, while maintaining high quality and durability. A streamlined manufacturing, shipping, and deployment process is essential, with each node in the system being a self-contained unit that can be effortlessly relocated or upgraded. Moreover, a robust and innovative approach is necessary for identifying the highest-yield areas to deploy these energy nodes. This will ensure the most efficient and effective use of resources in expanding the global renewable energy infrastructure.
      </p>
    </block>
    <block margin="half">
      <h4>Our mission</h4>
      <p>
        Our mission is to empower individuals to maximize their positive impact on the world by providing accessible and meaningful investment opportunities that align with their values. Through innovation and technology, we strive to create a platform that enables anyone to actively contribute to a sustainable future while achieving financial success by investing in what truly matters to them.
      </p>
    </block>
    <block margin="half">
      <h4>The company</h4>
      <p>
        Everyone should understand what they are investing in, the risks, and how its impacting them financially and the world societally.
      </p>
    </block>
    <block margin="half">
      <h4>The present</h4>
      <p>
        As a retail investor, it can be extremely difficult discerning a good investment from a bad one in terms of making money, let alone its societal impact. This is reflected in the significant growth of global index funds in recent years. Risk appetite is generally low, and people want to feel like they understand what they are investing in.
      </p>
      <p>
        The more pressing issue is that we are in the face of the impending energy crisis. We need more energy yesterday, and it should have been fossil-free a week ago. Innovation is lacking behind—not in effectiveness of the hardware available—but in scaling an industry that is requires substantial up-front investments, and yields slow, stable returns.
      </p>
      <p>
        And everyone are eager to be a part of the solution to the energy crisis, many have thrown money at high to medium risk green stocks and funds, with varying results, and close to zero insights into the impact they might be having. As evidenced by the expanding market for green bonds, increased allocations to clean energy funds, and the rising popularity of sustainable and responsible investment portfolios
      </p>
      <p>
        It is time to stop being opaque, and start scaling the impact. 
      </p>
    </block>
    <block margin="half">
      <h4>The solution</h4>
      <p>
        We have developed a transparent and scalable product that allows investors to contribute to renewable energy generation while receiving instant dividends. Our business model streamlines the process of identifying high-potential solar energy sites, manufacturing and deploying self-contained solar panel units, and connecting them to the grid. This reduces capital commitment and generates revenue that exceeds operating costs.
      </p>
      <p>
        Investors can purchase Direct Dividend Shares (DDS) in our Direct Dividend Global Index Fund (DDF), a high-frequency dividend fund with payouts as frequent as daily, hourly, or even by the minute. This intuitive investment object, combined with a minimalist, functionality-first Scandinavian design user interface, makes it easy for investors to understand their investment and its impact.
      </p>
      <p>
        Our solution empowers individuals to make a tangible impact on the energy crisis while benefiting from the financial rewards of renewable energy investments. By accelerating the transition to a more sustainable future, we enable investors to readily support the growth of clean energy infrastructure worldwide.
      </p>
    </block>
    <block margin="none">
      <h4>The product</h4>
      <content-card 
        title="Deploy high-efficiency monocrystalline solar panels, built for scale."
        content=""
        color="blue"
        :number="1"
      />
      <content-card 
        title="Use AI to identify high-potential solar energy sites."
        content=""
        color="blue"
        :number="2"
      />
      <content-card 
        title="DDF"
        content=""
        color="pink"
        :number="3"
      />
      <content-card 
        title="Let people invest in what they care about"
        content=""
        color="green"
        :number="4"
      />
      <content-card 
        title="Make it easy to understand the impact"
        content="Giving understandable ways to summarize the impact"
        color="green"
        :number="5"
      />
      <content-card 
        title="Pay back profits to investors directly"
        content=""
        color="pink"
        :number="6"
      />
    </block>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Whitepaper',
    layout:'whitepaper'
  })
  useHead({
    title: 'Whitepaper',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })
</script>
<style scoped lang="scss">
main{ background:white; }
p,h2,h3,h4{ color:black; }
a{ text-decoration:none; }
p{line-height:1.5;}
</style>