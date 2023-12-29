<template>
  <main>
    <block>
      <h1>Legal</h1>
      <p>Some legal stuff, you can update the concent at any later point.</p>
      <ul>
        <li>Terms of Service (you should read this)</li>
        <li>Performance updates</li>
        <li>Monthly newsletter</li>
        <li>Privacy policy (we dont share your data)</li>
      </ul>
      <input-button link="/invite/accept/auth">accept →</input-button>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Legal',
    middleware: 'auth'
  })
  useHead({
    title: 'Legal',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
  
</script>
<style scoped lang="scss">
  
</style>