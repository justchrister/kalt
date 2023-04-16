<template>
  <main>
    <block margin="none">
      <h3>Edit linked bank account</h3>
    </block>
    <block>
      <input-iban :initialValue="linkedBankAccount.iban"/>
      <input-bank-code :initialValue="linkedBankAccount.bank_code"/>
      <input-reference-text :initialValue="linkedBankAccount.reference"/>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Accounts',
    middleware: 'auth',
    layout:'focused'
  })
  useHead({
    title: 'Accounts',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const getLinkedBankAccount = async () => {
    const { data, error } = await supabase
      .from('get_linked_bank_accounts')
      .select()
      .eq('user_id', user.value.id)
      .limit(1)
      .single()
    if(data) {
      ok.log('success', 'got linked bank account', data)
      return data
    }
    if(error) {
      ok.log('', 'no linked bank account', error)
      return false
    }
  }
  const linkedBankAccount = await getLinkedBankAccount()

  
</script>
<style scoped lang="scss">
  
</style>


linked_bank_accounts