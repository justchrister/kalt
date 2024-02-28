<template>
  <main>
    <block margin="2">
      <navbar-tabs :hidePfp="true" />
    </block>
    <block margin="2">
      <profile-card />
    </block>
    <block margin="2">
      <select-currency />
    </block>
    <block margin="2">
      <select-auto-invest-rate />
    </block>
    <block margin="2">
      <select-language />
    </block>
    <block margin="2">
      <label> Legal stuff</label>
      <toggle-performance-updates />
      <toggle-newsletters />
      <toggle-terms-of-service />
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Profile',
    middleware: 'auth'
  })
  
  useSeoMeta({
    title: 'Profile',
    ogTitle: 'Kalt - Profile',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta.png'
  })
</script>