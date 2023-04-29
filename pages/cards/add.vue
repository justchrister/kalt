<template>
  <main>
    <navbar-breadcrumbs parent="cards"/>
    <block>
      <card-add/>
    </block>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Add card',
    middleware: 'auth'
  })
  useHead({
    title: 'Add card'
  })

</script>