<template>
  <main>
    <intro title="Open application"
    paragraph="We are always looking for talented individuals, both with and without a traditionaal education or relevant work experience."/>
    <block>
      <h2> The company </h2>
      <p>
        We are a forward-thinking organization that values innovation, creativity, and collaboration. Our team is committed to leveraging AI to drive positive change in various industries. We offer a supportive and inclusive work environment where you can grow professionally, contribute meaningfully, and make a significant impact.
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
            Opportunity to work on cutting-edge AI projects and applications
          </li>
          <li>
            Work on things that actually matter to you
          </li>
          <li>
            Mentorship and continuous learning opportunities
          </li>
          <li>
            Recognition and rewards for your achievements and contributions
          </li>
        </ul>
      </p>
    </block>
    <block>
      <h2>Working here</h2>
      <p>
        Benefits
        <ul>
          <li>
            Remote only
          </li>
        </ul>
        <ul>
          <li>
            5 weeks of vacation
          </li>
        </ul>
        <ul>
          <li>
            Clear strategy, following an OKR methodology
          </li>
        </ul>
      </p>
      <p>
        Your key characteristics:
        <ul>
          <li>
            Bachelor's or higher degree in Mathematics, Statistics, Computer Science, Engineering, or a related field, is cool but not required.
          </li>
        </ul>
        <ul>
          <li>
            Eager to learn.
          </li>
        </ul>
        <ul>
          <li>
            Knowledge of data structures, algorithms, and software design principles.
          </li>
        </ul>
        <ul>
          <li>
            Excellent problem-solving and analytical skills.
          </li>
        </ul>
        <ul>
          <li>
            Ability to work collaboratively in a team environment and communicate effectively with all stakeholders.
          </li>
        </ul>
        <ul>
          <li>
            Ability to work focused and find elegant solutions to complex problems.
          </li>
        </ul>
      </p>
      <p>
        But you are expected to give this your all.
      </p>
    </block>
    <block>
      <h2>
        Compensation
      </h2>
      <p>
        All employees are paid a minimum of 65 000 EUR, the same salary the CEO is paid.
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
<script setup>
  definePageMeta({
    pagename: 'Open application',
    middleware: 'default'
  })
  useHead({
    title: 'Open application'
  })
</script>
<style scoped lang="scss">
  main{padding-top:0;}
  ul{
    li{
      padding-left:$clamp-1;
      margin-top:$clamp-0-5;
    }
    li:before{
      content:'—';
    }
  }
  h2{
    margin-bottom:$clamp-1;
  }
</style>