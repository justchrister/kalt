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
      <span v-if="linkedBankAccount.iban">
        {{ok.formatIBAN(linkedBankAccount.iban)}}
      </span>
      <span v-else>
        not found
      </span>
    </div>
    <div>
      Bank code (BIC/SWIFT)
    </div>
    <div class="right">
      <span v-if="linkedBankAccount.bankCode">
        {{ok.formatBankCode(linkedBankAccount.bankCode)}}
      </span>
      <span v-else>
        not found
      </span>
    </div>
    <div>
      Reference text
    </div>
    <div class="right">
      <span v-if="linkedBankAccount.reference">
        {{linkedBankAccount.reference}}
      </span>
      <span v-else>
        not found
      </span>
    </div>
  </div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const userId = useSupabaseUser()
  const user = await get(supabase).user(userId.value.id);
  const linkedBankAccount = await get(supabase).linkedBankAccount(user);
</script>
<style scoped lang="scss">
  .card{
    box-sizing: border-box;
    border: $border;
    padding: sizer(1) sizer(2);
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
    color: $blue;
  }
  /*
  .dark-mode .card{
    border-color: $light;
  }*/
</style>