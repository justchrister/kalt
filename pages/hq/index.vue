<template>
  <main>
      <block>
        <h1>Register</h1>
        <ul>
          <li>
            <nuxt-link to="/hq/register-shares">
              Shares
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/hq/register-revenue">
              Revenue
            </nuxt-link>
          </li>
        </ul>
      </block>
      <block>
        <h1>Classify</h1>
        <ul>
          <li>
            <nuxt-link to="/hq/classify/art">
              Art
            </nuxt-link>
          </li>
        </ul>
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
      content: 'Invest in the future, today.'
    }]
  })
  
</script>
<style scoped lang="scss">
  
</style>