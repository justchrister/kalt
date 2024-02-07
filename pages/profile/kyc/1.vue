<template>
  <main>
    <block>
      What is the source of the money you are planning on investing?
      <progress-bar percentage="20%" />
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'source of funds',
    middleware: 'auth'
  })
  useHead({
    title: 'source of funds',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
  
</script>
<style scoped lang="scss">
  
</style>