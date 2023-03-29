<template>
  <main>
    <div class="block">
      <h3> Add a card to start investing </h3>
      <card-add/>
    </div>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Add card',
    middleware: 'auth'
  })
  useHead({
    title: 'Kalt — Add card',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })

</script>