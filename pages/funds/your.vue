<template>
  <main>
    <intro 
      title="Your value-driven fund"
      paragraph="Choose what your fund will consist of by simply setting 0-3 hearts on each of the funds." />
    <block>
      <fund-your ticker="ffe" />
      <fund-your ticker="art" />
      <fund-your ticker="ah" />
      <fund-your ticker="smb" />
      <block>
        <input-button link="/invest">invest now -></input-button>
      </block>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Your fund',
    middleware: 'auth'
  })
  useHead({
    title: 'Your fund',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
</script>
<style scoped lang="scss">
  main {
    padding-top: 0;
  }
</style>