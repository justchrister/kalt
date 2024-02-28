<template>
  <main>
    <block>
      <h1> Legally required </h1>
      <p> We are legally required to collect some info about you and where your money is coming from. We've made it as easy as possible and it only takes a couple of minutes to do. </p>
      <input-button link="/profile/kyc/1">start -></input-button>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'KYC',
    middleware: 'auth'
  })
  
  useSeoMeta({
    title: 'KYC',
    ogTitle: 'Kalt - KYC',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta.png'
  })
  
</script>