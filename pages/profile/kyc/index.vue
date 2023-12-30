<template>
  <main>
    <block>
      <h1> Know your customer </h1>
      <p> We are required by law to know who you are. </p>
      <input-button link="/profile/kyc/income">next →</input-button>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Know your customer',
    middleware: 'auth'
  })
  useHead({
    title: 'Know your customer',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
  
</script>
<style scoped lang="scss">
  
</style>