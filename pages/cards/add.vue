<template>
  <main>
    <navbar-breadcrumbs parent="cards"/>
    <block>
      <label>add card:</label>
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
    title: 'Add card',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })

</script>