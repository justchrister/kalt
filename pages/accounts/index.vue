<template>
  <main>
    <intro title="Accounts" text="Make money, make a difference." />
    <block margin="half">
      <account-details-card />
      <info-box type="success" text="With automatic investment set to 100% and automatic transfers to Kalt, you can set up a low-cost alternative to subscriptions ✨" />
      <cta />
    </block>
    <block margin="half">
      <linked-bank-account-card />
    </block>

    <transaction-list limit="10"/>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Accounts',
    middleware: 'auth'
  })
  useHead({
    title: 'Accounts',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })
  
</script>
<style scoped lang="scss">
  main{padding-top:0;}
</style>