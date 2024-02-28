<template>
  <main>
    <block>
      <h1> Where <span v-if="user.city">in {{ user.city }}</span> do you live?</h1>
      <form @submit.prevent="navigateTo('/invite/accept/payment-method')">
        <input-user :user="user" id="addressLine1" />
        <input-button link="">next →</input-button>
      </form>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'City',
    middleware: 'auth'
  })
  useSeoMeta({
    title: 'Accept invite',
    ogTitle: 'Kalt - Accept invite',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta.png'
  })
const supabase = useSupabaseClient()
const auth = useSupabaseUser()
const user = await get(supabase).user(auth.value) as user;
</script>
<style scoped lang="scss">
  .inputGroup {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: sizer(1);
  }
</style>