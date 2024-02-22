<template>
  <main>
    <intro title="Build a purpose-driven portfolio"
      paragraph="Choose what you want to invest in both through your subscription and when completing single investments." />
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