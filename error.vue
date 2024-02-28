<template>
  <main>
    <block>
      <img src="/images/error.jpg" alt="" style="max-width:100%"/>
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
    middleware: ['default']
  })
  
  useSeoMeta({
    title: 'Error',
    ogTitle: 'Error',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta.png'
  })
</script>
<style scoped lang="scss">
  
</style>