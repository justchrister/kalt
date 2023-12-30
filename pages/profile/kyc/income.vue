<template>
  <main>
    <block>
      <input-kyc :user="user" id="income" />
      <input-kyc :user="user" id="incomeExplanation" />
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'KYC: income',
    middleware: 'auth'
  })
  useHead({
    title: 'KYC: income',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
  
</script>
<style scoped lang="scss">
  
</style>