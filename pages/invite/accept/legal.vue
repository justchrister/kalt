<template>
  <main>
    <block>
      <h1>Legal</h1>
      <p>By clicking accept you agree to our: </p>
      <ul>
        <li>— Terms of service (you should read this)</li>
        <li>— Performance updates</li>
        <li>— Receiving a monthly newsletter</li>
        <li>— Privacy policy - we dont share your data</li>
      </ul>
      <input-button link="/invite/accept/country">accept →</input-button>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Legal',
    middleware: 'auth'
  })
  useSeoMeta({
    title: 'Accept invite',
    ogTitle: 'Kalt - Accept invite',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta.png'
  })

</script>