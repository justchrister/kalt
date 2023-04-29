
<template>
  <main>
    <navbar-breadcrumbs parent="Accounts"/>
    <transaction-list />
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Transactions',
    middleware: 'auth'
  })
  useHead({
    title: 'Transactions'
  })

</script>