<template>
  <main>
    <navbar-tabs/>
    <block margin="2">
      <account-card />
      <input-button link="/accounts/transactions">transactions</input-button>
    </block>
    <block margin="2">
      <account-details />
      <input-button link="/invest">invest →</input-button>
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
  useHead({
    title: 'Accounts'
  })
  
</script>
<style scoped lang="scss">
  button{
    margin-top: sizer(1);
  }
</style>