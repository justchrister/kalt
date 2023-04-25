<template>
  <main>
    <block>
      <img src="/error.jpg" alt="" style="max-width:100%"/>
      <br/>
      <br/>
      <h1 class="sans-serif">Requested page did not exist</h1>
      <nuxt-link to="/">Go to homepage</nuxt-link>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'error',
    middleware: 'auth'
  })
  useHead({
    title: 'error',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })
  
</script>
<style scoped lang="scss">
  
</style>