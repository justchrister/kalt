<template>
  <main>
    <intro title="Co-founders needed"
    paragraph="We are looking for exceptionally talented people to join us in building the next era of capitalism."/>
    <block>
      <h2> The company </h2>
      <p>
        We are a tiny forward-thinking firm focused on innovation, creativity, and collaboration. We are leveraging AI to drive positive change in various industries. We offer a supportive and inclusive work environment where you can grow professionally, contribute meaningfully, and make a significant impact.
      </p>
      <p>
        What we offer:
        <ul>
          <li>
            A cut throat environment where delivery is key
          </li>
          <li>
            Lack of structure/just enough structure
          </li>
          <li>
            Opportunity to work on cutting-edge ML projects
          </li>
          <li>
            Work on things that actually matter
          </li>
          <li>
            Mentorship and continuous learning opportunities
          </li>
          <li>
            Recognition and rewards for your achievements and contributions
          </li>
        </ul>
      </p>
      <p>
        Benefits
        <ul>
          <li>
            Remote only
          </li>
          <li>
            Co-founder title
          </li>
          <li>
            5 weeks of vacation
          </li>
          <li>
            Clear strategy, following an OKR methodology
          </li>
        </ul>
      </p>
      <p>
        Our tech-stack:
        <ul>
          <li>
            Python based ML stack
          </li>
          <li>
            Node+TS based data-crawlers
          </li>
          <li>
            Nuxt 3 based website
          </li>
          <li>
            Supabase + Vercel as backend
          </li>
        </ul>
      </p>
      <p>
        Read more on <a href="https://github.com/justchrister/kalt" target="_blank"> GitHub ↗</a>.
      </p>
    </block>
    <block>
      <h2> You </h2>
      <p>
        Your key characteristics:
        <ul>
          <li>
            Eager to build a product.
          </li>
          <li>
            Excellent problem-solving and analytical skills.
          </li>
          <li>
            Ability to communicate effectively.
          </li>
          <li>
            Loves working focused.
          </li>
          <li>
            A make it work, make it great attitude.
          </li>
          <li>
            Total dedication to the project.
          </li>
          <li>
            A degree in math, statistics, CS, or engineering, is cool but not required.
          </li>
        </ul>
      </p>
      <p>
        The open roles:
        <ul>
          <li>
            Fullstack developer (TS, Node, Nuxt, Python)
          </li>
          <li>
            Data scientist
          </li>
          <li>
            Data engineer
          </li>
          <li>
            ML engineer
          </li>
          <li>
            Chief investment officer
          </li>
          <li>
            Chief technology officer
          </li>
        </ul>
      </p>
    </block>
    <block>
      <h2>
        Compensation
      </h2>
      <p>
        All employees are paid a minimum of 75 000 EUR, the same salary the CEO is paid.
      </p>
      <p>
        There are also performance based bonuses, which are given out only based on performance not on inherently flawed performance indicators. You choose if this bonus should be in stock or cash.
      </p>
    </block>
    <block>
      <h2>
        Apply now!
      </h2>
      <p>
        Send us an email at <a href="mailto:sup@ka.lt">sup@ka.lt</a> with some info about yourself, and we'll be in touch.
      </p>
    </block>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Open application'
  })
  useHead({
    title: 'Open application'
  })
</script>
<style scoped lang="scss">
  main{padding-top:0;}
  ul{
    li{
      padding-left: sizer(1);
      margin-top: sizer(0.5);
    }
    li:before{
      content:'—';
    }
  }
  h2{
    margin-bottom: sizer(1);
  }
</style>