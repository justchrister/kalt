<template>
  <main>
    <block>
      <h1> Which card would you like to charge?</h1>

      <input-button link="/funds/your">build your fund →</input-button>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Card',
    middleware: 'auth'
  })
  useHead({
    title: 'Card',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;
</script>