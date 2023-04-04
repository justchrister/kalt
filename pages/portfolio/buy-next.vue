<template>
  <main>
    <input-amount-invest />
    <button>
      complete order
    </button>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Buy next',
    middleware: 'auth'
  })
  useHead({
    title: 'Buy next',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })
</script>
<style scoped lang="scss">
  
</style>