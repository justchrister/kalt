<template>
  <main>
    <block margin="half">
      <h1>
        Let's invest in the future, today! <omoji emoji="✨" />
      </h1>
    </block>
    <block margin="1">
      <input-amount-buy />
    </block>
    <block margin="1">
      <select-fund />
    </block>
    <block margin="1">
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