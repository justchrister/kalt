<template>
  <div class="card" @click="navigateTo('/accounts/edit')">
    <div class="bold">
      Withdrawal details
    </div>
    <div class="right link">
      edit →
    </div>
    <div>
      Name
    </div>
    <div class="right">
      {{ name }}
    </div>
    <div>
      IBAN
    </div>
    <div class="right">
      {{ iban }}
    </div>
    <div>
      Bank code (BIC/SWIFT)
    </div>
    <div class="right">
      {{ bankCode }}
    </div>
    <div>
      Reference text
    </div>
    <div class="right">
      {{ reference  }}
    </div>
  </div>
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;

  const name = user?.firstName + ' ' + user?.lastName|| 'not found'

  const account = await get(supabase).linkedBankAccount(user?.id) as account;

  const reference = account?.reference || 'not found'
  const iban = ok.formatIBAN(account?.iban) || 'not found'
  const bankCode = ok.formatBankCode(account?.bankCode) || 'not found'
  console.log(reference)
  
</script>
<style scoped lang="scss">
  .card{
    box-sizing: border-box;
    border: $border;
    padding: sizer(1) sizer(2);
    display: grid;
    grid-template-columns: 1fr 1fr;
    @include border;
    @include hoverable;
    &:hover{
      @include hovering;
      .link{
        color:dark(100%);
      }
    }
  }
  .link{
    color:dark(80%);
    font-size:75%;
  }

  .bold{
    font-weight: bold;
  }
  .right{
    text-align: right;
  }
  a{
    color: $blue;
  }
</style>