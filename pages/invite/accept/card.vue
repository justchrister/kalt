<template>
  <main>
    <block>
      <h1> Which card would you like to charge?</h1>
      <card />
      <input-button link="/funds/your">build your fund →</input-button>
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