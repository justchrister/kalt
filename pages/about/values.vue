<template>
  <main class="values">
    <intro 
      title="Our values and goals"
      paragraph="All humans are our stakeholders, we try to find a slightly better solution to each challenge we find. Trying to make a slightly better world for everyone at each turn." />
    <block margin="half">
      <h4>Maximize impact</h4>
      <p>
        Impact and wealth creation are not in opposition, they should work together, where wealth creation creates more impact and vice versa.
      </p>
    </block>
    <block margin="half">
      <h4>Aim for clarity</h4>
      <p>
        Everyone should understand what they are investing in, the risks, and how its contributing to the wealth creation.
      </p>
    </block>
    <block margin="half">
      <h4>Simple first, then powerful</h4>
      <p>
        Focus on simplicity in functionality before adding a bunch of shiny features that might not accomplish much. Skip the nonesense and jargon.
      </p>
    </block>
    <block margin="half">
      <h4>Agressively optimistic</h4>
      <p>
        Creating Kalt won't be a walk in the park; it demands years of dedication and innovation. We are driven by our mission and determined to stay optimistic, even when faced with immense challenges.
      </p>
    </block>
    <block margin="half">
      <h4>Build for people</h4>
      <p>
        Both our customer facing solution, such as this website, but also the infrastructure we are creating globally, needs to be built for the people actually living there.
      </p>
    </block>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Our values'
  })
  useHead({
    title: 'Our values',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })
</script>
<style scoped>
main{
  padding-top:0;
}
</style>