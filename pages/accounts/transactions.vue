
<template>
  <main>
    <navbar-breadcrumbs parent="Accounts"/>
    <transaction-list />
  </main>
</template>
<script setup>
  definePageMeta({
    pagename: 'Transactions',
    middleware: 'auth'
  })
  useHead({
    title: 'Transactions'
  })

</script>