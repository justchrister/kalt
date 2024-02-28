<template>
  <main>
    <navbar-tabs />
    <block>
      <update-single id="id" title="Welcome" ingress="We are super excited to have you on board, welcome to the club!" category="general" date="01.01.2024" :read="false"/>
      <update-single id="id" title="You can now invite 10 friends to join Kalt" ingress="ingress" category="general" date="01.01.2024" :read="false"/>
      <update-single id="id" title="So far this year you've earned 10 000$" ingress="At this rate you will reach your savings goal of 100,000 by march next year" category="performance" date="01.01.2024"/>
      <update-single id="id" title="You have to confirm some info" ingress="On a regular basis we are required to ask you to confirm some information" category="kyc" date="01.01.2024" :read="false"/>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Updates',
    middleware: 'auth'
  })
  useSeoMeta({
    title: 'Updates',
    ogTitle: 'Updates',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta.png'
  })
</script>
<style scoped lang="scss">
.update{
  margin-bottom:sizer(1);
}
</style>