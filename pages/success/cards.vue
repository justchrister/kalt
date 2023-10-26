<template>
  <main>
    <block margin="half">
      <success-banner />
    </block>
    <block>
      We've successfully changed your default card
      <button @click="goBack()">
        ← back
      </button>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Success',
    middleware: 'auth'
  })
  useHead({
    title: 'Success',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
  const goBack = () => {
    clearTimeout(timer1)
    navigateTo('/cards')
  }
  var timer1 = setTimeout(goBack, 1500)
</script>
<style scoped lang="scss">
</style>