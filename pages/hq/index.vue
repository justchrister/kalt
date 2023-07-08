<template>
  <main>
      <block>
        <h1>Register</h1>
        <nuxt-link to="/hq/register-shares">
          Shares
        </nuxt-link>
        <nuxt-link to="/hq/register-revenue">
          Revenue
        </nuxt-link>
      </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'HQ',
    middleware: 'auth-hq'
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