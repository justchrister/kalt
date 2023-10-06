<template>
  <main>
    <block margin="half">
      <intro-fund ticker="ffe" text="Our goal is to accelerate the global transition to sustainable energy sources, fostering a better future for our planet. "/>
    </block>
    <block>
      <criteria-list>
        <criteria :nr="1">
          The geographical area must have high GDP growth potential
        </criteria>
        <criteria :nr="2">
          The geographical area must have high energy generation potential
        </criteria>
        <criteria :nr="3">
          The country must have moderate to low political risk
        </criteria>
      </criteria-list>
    </block>
    <block>
      By investing with us, you directly contribute to the development and deployment of fossil-free energy alternatives. Together, we can create a more sustainable world while enjoying the financial benefits of supporting fossil-free energy solutions.
      <br><br>
      <button @click="navigateTo('/invest')"> invest now -> </button>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Fossil-free energy'
  })
  useHead({
    title: 'Fossil-free energy',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })
  
</script>
<style scoped lang="scss">

</style>