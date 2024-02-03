<template>
  <main>
    <block>
      <label> Default payment method: </label>
      <payment-method-default :user="user" :link="false"/>
      <input-button link="/payment-methods/add"> change payment method </input-button>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'page',
    middleware: 'auth'
  })
  useHead({
    title: 'page',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })

  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;
  </script>
<style scoped lang="scss"></style>