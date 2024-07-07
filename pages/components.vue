<template>
  <main>
    <block>
      <chat-note>
        {{ text }}
      </chat-note>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Components'
  })
  useHead({
    title: 'Components',
    meta: [{
    name: 'description',
    content: 'Invest in the future, today.'
    }]
  })
  const text = ` 
hello number two`

</script>
<style scoped lang="scss">

</style>