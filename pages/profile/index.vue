<template>
  <main>
    <block margin="2" >
      <navbar-tabs :hidePfp="true"/>
    </block>
    <block margin="2" >
      <profile-card />
    </block>
    <block margin="2" >
      <select-currency />
    </block>
    <block margin="2" >
      <select-auto-invest />
    </block>
    <block margin="2" >
      <select-language />
    </block><!--
    <block margin="2" >-->
      <select-color-scheme />
    </block>
    <block margin="2" >
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
    middleware: ['default', 'auth']
  })
  useHead({
    title: 'Profile'
  })
</script>