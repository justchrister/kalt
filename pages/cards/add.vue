<template>
  <main>
    <navbar-breadcrumbs parent="cards"/>
    <block>
      <card-add/>
    </block>
  </main>
</template>
<script setup>
  definePageMeta({
    pagename: 'Add card',
    middleware: 'auth'
  })
  useHead({
    title: 'Add card'
  })

</script>