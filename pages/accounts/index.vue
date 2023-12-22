<template>
  <main>
    <navbar-tabs/>
    <block margin="2">
      <account-card />
      <nuxt-link to="accounts/transactions">
        <button>transactions →</button>
      </nuxt-link>
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