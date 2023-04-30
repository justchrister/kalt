<template>
  <main>
    <block margin="none" width="small">
      <navbar-back to="/portfolio"/>
    </block>
    <block margin="2" width="small">
      <profile-card />
    </block>
    <block margin="2" width="small">
      <select-currency />
    </block>
    <block margin="2" width="small">
      <select-auto-invest />
    </block>
    <block margin="2" width="small">
      <select-language />
    </block>
    <block margin="2" width="small">
      <select-color-scheme />
    </block>
    <block margin="2" width="small">
      <label> Legal stuff</label>
      <toggle-performance />
      <toggle-emails />
      <toggle-terms-of-service />
    </block>
  </main>
</template>

<script lang="ts" setup>
  definePageMeta({
    pagename: 'Profile',
    middleware: 'auth'
  })
  useHead({
    title: 'Profile'
  })
</script>