<template>
  <main>
    <navbar-tabs />
    <block margin="2">
      <account-card />
      <input-button link="/accounts/transactions">transactions</input-button>
    </block>
    <block margin="2">
      <account-linked />
      <input-button link="/accounts/withdraw">← withdraw</input-button>
    </block>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Accounts',
    middleware: 'auth'
  })
  
  useSeoMeta({
    title: 'Accounts',
    ogTitle: 'Accounts',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta.png'
  })
</script>
<style scoped lang="scss">
  button {
    margin-top: sizer(1);
  }
</style>