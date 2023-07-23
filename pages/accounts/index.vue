<template>
  <main>
    <navbar-tabs/>
    <block margin="none">
      <info-box type="success" text="With automatic investment set to 100% and automatic transfers to Kalt, you can set up a low-cost alternative to subscriptions ✨" />
    </block>
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
    middleware: ['default', 'auth']
  })
  useHead({
    title: 'Accounts'
  })
  
</script>
<style scoped lang="scss">
  button{
    margin-top:$clamp;
  }
</style>