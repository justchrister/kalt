<template>
  <main>
    <block margin="4">
      <h2>Details</h2>
      <div class="col-2">
        <input-user id="firstName" />
        <input-user id="lastName" />
      </div>
      <select-birthdate />
      <select-country />
      <div class="col-1-4">
        <input-user id="city" />
        <input-user id="postalCode" />
      </div>
      <input-user id="addressLine1" />
    </block>
    <block margin="none">
      <h2>Preferences</h2>
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
    <block margin="2" type="expand" label="Legal stuff">
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
<style lang="scss" scoped>
  .col-2{
    display:grid;
    grid-template-columns: 1fr 1fr;
    gap: sizer(1);
  }
  .col-1-4{
    display:grid;
    grid-template-columns: 5fr 2fr;
    gap: sizer(1);
  }
</style>