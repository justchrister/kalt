<template>
  <main>
    <navbar-tabs/>
    <block margin="2">
      <account-card />
      <input-button link="/accounts/transactions">transactions →</input-button>
    </block>
    <block margin="2">
      <account-details />
    </block>
    <block margin="2">
      <account-linked />
    </block>
  </main>
</template>
<script setup>
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