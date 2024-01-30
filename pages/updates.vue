<template>
  <main>
    <navbar-tabs />
    <block>
      <update-single id="id" title="Welcome to Kalt!" ingress="We are super excited to have you on board, welcome to the club!" category="performance" date="01.01.2024"/>
      <update-single id="id" title="title" ingress="ingress" category="majorEvent" date="01.01.2024"/>
      <update-single id="id" title="title" ingress="ingress" category="performance" date="01.01.2024"/>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Updates',
    middleware: 'auth'
  })
  useHead({
    title: 'Updates',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
</script>
<style scoped lang="scss">
.update{
  margin-bottom:sizer(1);
}
</style>