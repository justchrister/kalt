<template>
  <main>
    <block>
      <input-user :user="user" id="user"/>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Name',
    middleware: 'auth'
  })
  useHead({
    title: 'Name',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
  
</script>
<style scoped lang="scss">
  
</style>