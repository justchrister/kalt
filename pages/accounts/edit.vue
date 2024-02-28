<template>
  <main>
    <block margin="none">
      <h3>Edit linked bank account</h3>
    </block>
    <block>
      <input-iban :initialValue="iban" />
      <input-bank-code :initialValue="bankCode" />
      <input-reference-text :initialValue="reference" />
      <input-button link="/accounts">done</input-button>
    </block>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Accounts',
    middleware: 'auth'
  })
  
  useSeoMeta({
    title: 'Accounts',
    ogTitle: 'Accounts',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta.png'
  })
  
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;
  const linkedBankAccount = await get(supabase).linkedBankAccount(user);
  const iban = linkedBankAccount?.iban || null;
  const reference = linkedBankAccount?.reference || null;
  const bankCode = linkedBankAccount?.bankCode || null;

</script>
<style scoped lang="scss">
  button {
    margin-top: sizer(2);
  }
</style>