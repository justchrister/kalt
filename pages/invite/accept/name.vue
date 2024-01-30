<template>
  <main>
    <block>
      <h1> What should we call you?</h1>
      <div class="inputGroup">
        <input-user :user="user" id="firstName" />
        <input-user :user="user" id="lastName" />
      </div>
      <input-button link="/invite/accept/legal">next →</input-button>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Name',
    middleware: 'auth'
  })
  useHead({
    title: 'Name',
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
  .inputGroup {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: sizer(1);
  }
</style>