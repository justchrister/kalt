<template>
  <main>
    <block>
      <h1>
        Let's invest in the future, today! <omoji emoji="✨" />
      </h1>
      <select-fund />
      <input-amount-buy />
      <button> Invest </button>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Invest',
    middleware: 'auth'
  })
  useHead({
    title: 'Invest',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })
  
</script>
<style scoped lang="scss">
  
</style>