<template>
  <main>
    <navbar-breadcrumbs parent="profile" />
    <block>
      <select-profile-picture />
      <input-user id="firstName" />
      <input-user id="lastName" />
      <select-country />
      <input-user id="city" />
      <input-user id="postalCode" />
      <input-user id="addressLine1" />
      <select-birthdate />
      <input-button link="/profile">done
        <omoji emoji="✔️" />
      </input-button>
    </block>
  </main>
</template>

<script setup lang="ts">
  definePageMeta({
    pagename: 'Edit',
    middleware: 'auth'
  })
  
  useSeoMeta({
    title: 'Edit',
    ogTitle: 'Kalt - Edit',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta.png'
  })


</script>