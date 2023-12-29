<template>
  <main>
    <block>
      <h1> Which city <span v-if="user.country">in {{ user.country }}</span> do you live in?</h1>
      <input-user :user="user" id="city"/>
      <input-button link="/invite/accept/address">next →</input-button>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'City',
    middleware: 'auth'
  })
  useHead({
    title: 'City',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;
</script>
<style scoped lang="scss">

.inputGroup{
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: sizer(1);
  }
  
</style>