
<template>
  <main>
    <navbar-breadcrumbs parent="Accounts"/>
    <transaction-list />
  </main>
</template>
<script setup>
  definePageMeta({
    pagename: 'Transactions',
    middleware: ['default', 'auth']
  })
  useHead({
    title: 'Transactions'
  })

</script>