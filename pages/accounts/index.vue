<template>
  <main>
    <navbar-breadcrumbs parent="profile"/>
    <block margin="none">
      <info-box type="success" text="With automatic investment set to 100% and automatic transfers to Kalt, you can set up a low-cost alternative to subscriptions ✨" />
    </block>
    <block margin="half">
      <account-details-card />
      <cta />
    </block>
    <block margin="half">
      <linked-bank-account-card />
    </block>
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