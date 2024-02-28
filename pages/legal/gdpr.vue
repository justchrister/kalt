<template>
  <main>
    <block margin="3">
      <h1> GDPR </h1>
      <p>At Kalt LLC, your privacy is important to us.</p>
    </block>
    <block margin="3">
      <h2>Data Processing</h2>
      <p>We collect and process your personal data for the purpose of providing our services. Rest assured, we do not
        share this data with third parties.</p>
    </block>
    <block>
      <h2>Data Deletion</h2>
      <p>If you wish to have your data deleted from our system, please send an email to gdpr@ka.lt and we will proceed
        with the removal of your information.</p>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'GDPR'
  })
  useSeoMeta({
    title: 'GDPR',
    ogTitle: 'Kalt — GDPR',
    description: 'Our GDPR policy.',
    ogDescription: 'Our GDPR policy.',
    ogImage: 'https://ka.lt/images/meta-legal.png'
  })

</script>
<style scoped lang="scss">
  main {
    margin-top: 0;
  }
</style>