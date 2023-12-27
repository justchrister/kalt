<template>
  <main>
    <block margin="none">
      <h3>Edit linked bank account</h3>
    </block>
    <block>
      <input-iban :initialValue="linkedBankAccount.iban"/>
      <input-bank-code :initialValue="linkedBankAccount.bankCode"/>
      <input-reference-text :initialValue="linkedBankAccount.reference"/>
      <input-button link="/profile">done</input-button>
    </block>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Accounts',
    middleware: 'auth',
    layout:'focused'
  })
  useHead({
    title: 'Accounts'
  })
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;
  const linkedBankAccount = await get(supabase).linkedBankAccount(user);
  ok.log('', linkedBankAccount)
  
</script>
<style scoped lang="scss">
  button{
    margin-top: sizer(2);
  }
</style>