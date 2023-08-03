<template>
  <main>
    <frame-wrap>
      <frame-image src="/media/images/celebrate_tumbl_aesthetic.png" />
    </frame-wrap>
    <block>
      <h1> Transaction successful <omoji emoji="✨" /></h1>
      <p> You have successfully invested in the future of fossil-free energy. Sit back, relax, and let the markets do its magic. We will keep you upated. </p>
      <nuxt-link to="/portfolio"> 
        <button> Back to portfolio </button>
      </nuxt-link> 
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
      content: 'Make money, make a difference.'
    }]
  })
  
</script>
<style scoped lang="scss">
  
</style>