<template>
  <div class="card">
    <div class="bold">
      Linked bank account details
    </div>
    <div class="right">
      <nuxt-link to="accounts/edit">
        change
      </nuxt-link>
    </div>
    <div>
      Name
    </div>
    <div class="right">
      Christer Bjørnstad
    </div>
    <div>
      E-mail
    </div>
    <div class="right">
      christer@ka.lt
    </div>
    <div>
      IBAN
    </div>
    <div class="right">
      {{ok.formatIBAN(linkedBankAccount.iban)}}
    </div>
    <div>
      Bank code (BIC/SWIFT)
    </div>
    <div class="right">
      {{ok.formatBankCode(linkedBankAccount.bank_code)}}
    </div>
    <div>
      Reference text
    </div>
    <div class="right">
      {{linkedBankAccount.reference}}
    </div>
  </div>
</template>
<script setup>
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
  .card{
    box-sizing: border-box;
    border:$border;
    padding: $clamp-1 $clamp-2;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .bold{
    font-weight: bold;
  }
  .right{
    text-align: right;
  }
  a{
    color:$blue;
  }
</style>