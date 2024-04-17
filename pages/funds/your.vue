<template>
  <main>
    <intro 
      title="Your value-driven fund"
      paragraph="Choose what your fund will consist of by simply setting 0-3 hearts on each of the funds." />
    <block>
      <fund-your ticker="art" />
      <fund-your ticker="ffe" />
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
  
  useSeoMeta({
    title: 'Your fund',
    ogTitle: 'Kalt - Your fund',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta-funds.png'
  })
</script>
<style scoped lang="scss">
  main {
    padding-top: 0;
  }
</style>