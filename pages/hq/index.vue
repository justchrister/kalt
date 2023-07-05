<template>
  <main>
      <block>
        <nuxt-link to="hq/sell-order">
          Create sell order
        </nuxt-link>
      </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'HQ',
    middleware: 'auth'
  })
  useHead({
    title: 'HQ',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })
  
</script>
<style scoped lang="scss">
  
</style>