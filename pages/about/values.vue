<template>
  <main class="values">
    <intro 
      title="Our values and goals"
      paragraph="Our mission is to empower individuals to maximize their positive impact on the world by providing accessible and meaningful investment opportunities that align with their values. Through innovation and technology, we strive to create a platform that enables anyone to actively contribute to a sustainable future while achieving financial success by investing in what truly matters to them." />
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
      <h4>Equal opportunity</h4>
      <p>
        We believe that everyone should have access to this kind of investment opportunity. You should not have to be a millionaire to invest in fossil-free energy, and you can feel good knowing that your money is making a difference for families in developing regions, for the environment, and generating you a passive income.
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
<script setup>
  definePageMeta({
    pagename: 'Our values',
    middleware: 'default'
  })
  useHead({
    title: 'Our values'
  })
</script>
<style scoped>
main{
  padding-top:0;
}
</style>