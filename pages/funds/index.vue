<template>
  <main>
    <block>
      <fund ticker="gi.ddf" :checkable="true"/>
    </block>
    <block>
      <fund ticker="ffe.ddf" :checkable="true"/>
    </block>
    <block>
      <fund ticker="art.ddf" :checkable="true"/>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Funds'
  })
  useHead({
    title: 'Funds',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })
  
</script>
<style scoped lang="scss">
  
</style>