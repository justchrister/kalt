<template>
  <main>
    <block margin="none">
      <h3>Edit linked bank account</h3>
    </block>
    <block>
      <input-iban :initialValue="linkedBankAccount.iban"/>
      <input-bank-code :initialValue="linkedBankAccount.bankCode"/>
      <input-reference-text :initialValue="linkedBankAccount.reference"/>
      <button @click="router.go(-1)"> done </button>
    </block>
  </main>
</template>
<script setup>
  definePageMeta({
    pagename: 'Accounts',
    middleware: 'auth',
    layout:'focused'
  })
  useHead({
    title: 'Accounts'
  })
  const supabase = useSupabaseClient()
  const userId = useSupabaseUser()
  const user = await get(supabase).user(userId.value.id);
  const linkedBankAccount = await get(supabase).linkedBankAccount(user);
  ok.log('', linkedBankAccount)
  
  const router = await useRouter()
</script>
<style scoped lang="scss">
  button{
    margin-top: sizer(2);
  }
</style>