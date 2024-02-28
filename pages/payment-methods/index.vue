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
    pagename: 'Payment method',
    middleware: 'auth'
  })
  
  useSeoMeta({
    title: 'Payment method',
    ogTitle: 'Kalt - Payment method',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta.png'
  })

  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;
  </script>
<style scoped lang="scss"></style>