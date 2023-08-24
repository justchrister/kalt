<template>
  <main>
    <block margin="none">
      <h3>Edit linked bank account</h3>
    </block>
    <block>
      <input-iban :initialValue="linkedBankAccount.iban"/>
      <input-bank-code :initialValue="linkedBankAccount.bankCode"/>
      <input-reference-text :initialValue="linkedBankAccount.reference"/>
      <button @click="navigateTo('/accounts')"> done </button>
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
  const user = useSupabaseUser()

  const getLinkedBankAccount = async () => {
    const { data, error } = await supabase
      .from('getLinkedBankAccount')
      .select()
      .eq('userId', user.value.id)
      .limit(1)
      .single()
    if(data) {
      ok.log('success', 'got linked bank account', data)
      return data
    }
    if(error) {
      ok.log('', 'no linked bank account')
      return false
    }
  }
  const linkedBankAccount = await getLinkedBankAccount()

  
</script>
<style scoped lang="scss">
  button{
    margin-top: $clamp-2;
  }
</style>