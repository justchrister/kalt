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
  useHead({ title: 'Edit' })

</script>