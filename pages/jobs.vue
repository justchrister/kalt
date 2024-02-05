<template>
  <main>
    <intro title="Co-founders needed"
      paragraph="We are looking for exceptionally talented people to join us in building the next era of capitalism." />
    <block margin="half">
      <h2> The company </h2>
      <p>
        We are a small forward-thinking firm focused on innovation, creativity, and collaboration. We are leveraging AI to
        drive positive change in various industries. We offer a supportive and inclusive work environment where you can
        grow professionally, contribute meaningfully, and make a significant impact.
      </p>
      <p>
        Learn more about our <nuxt-link to="/vision">vision →</nuxt-link>
      </p>
      <p>
        Operational philosophy: 
      </p>
      <ul>
        <li>
          An academic environment where delivery is the key
        </li>
        <li>
          Just enough structure, read about our <a href="https://k-lt.medium.com/the-kalt-method-afb1f91f981d"
            target="_blank">method ↗</a>
        </li>
        <li>
          Simple first, then powerful
        </li>
        <li>
          Solve real problems with cutting-edge ML/AI
        </li>
      </ul>
      <p>
        Our tech-stack:
      </p>
      <ul>
        <li>
          Python ML stack
        </li>
        <li>
          Node/puppeteer data-crawlers
        </li>
        <li>
          Nuxt 3 website
        </li>
        <li>
          Supabase + Vercel as backend
        </li>
      </ul>
      <p>
        Read more on <a href="https://github.com/justchrister/kalt" target="_blank"> GitHub ↗</a>
      </p>
    </block>
    <block margin="half">
      <h2>Open roles</h2>
      <ul>
        <li>
          Fullstack developer
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
      </ul>
    </block>
    <block margin="half">
      <h2> Qualifications and expectations </h2>
      <p>
        Building the new era of capitalism won't be a walk in the park; it demands years of dedication and innovation. All
        co-founders need to be aggressively optimistic and driven by our mission, even when faced with immense challenges.
      </p>
      <p>
        Key characteristics:
      </p>
      <ul>
        <li>
          Eager to build products, not just tech.
        </li>
        <li>
          Excellent problem-solving and analytical skills.
        </li>
        <li>
          Ability to communicate effectively.
        </li>
        <li>
          Loves focused work.
        </li>
        <li>
          A make it work, make it great attitude.
        </li>
        <li>
          Total dedication to the project.
        </li>
      </ul>
      <p>
        A degree in math, statistics, computer science, or engineering, is cool but not required.
      </p>
    </block>
    <block margin="half">
      <h2>
        Benefits and compensation
      </h2>
      <p>
        All employees are paid a minimum of 75 000 EUR, the same salary the CEO is paid.
      </p>
      <p>
        Benefits
      </p>
      <ul>
        <li>
          Co-founder title
        </li>
        <li>
          5 weeks of vacation
        </li>
        <li>
          Clear strategy, following our <a href="https://k-lt.medium.com/the-kalt-method-afb1f91f981d"
            target="_blank">method ↗</a>
        </li>
        <li>
          Remote-first
        </li>
        <li>
          Stock/cash based bonuses
        </li>
      </ul>
    </block>
    <block>
      <h2>
        Apply now
      </h2>
      <p>
        Send us an email at <a href="mailto:sup@ka.lt">sup@ka.lt</a> with some info about yourself, and we'll be in touch
        quickly.
      </p>
    </block>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Jobs'
  })
  useHead({
    title: 'Jobs'
  })
</script>
<style scoped lang="scss">
  main {
    padding-top: 0;
  }

  ul {
    li {
      padding-left: sizer(1);
      margin-top: sizer(0.5);
    }

    li:before {
      content: '—';
    }
  }

  h2 {
    margin-bottom: sizer(1);
  }
</style>