<template>
  <div class="card" v-if="linkedBankAccount.iban && linkedBankAccount.bankCode">
    <div class="bold">
      Linked bank account details
    </div>
    <div class="right">
      <nuxt-link to="accounts/edit">
        change
      </nuxt-link>
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
  <div class="not-linked" @click="navigateTo('/accounts/edit/')" v-else>
    no linked account to transfer to <span> link account </span>
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
    border:$border;
    padding: sizer(1) sizer(2);
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin:sizer(1.5) 0 sizer(1) 0;
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
  .not-linked{
    box-sizing: border-box;
    border:$border;
    padding: sizer(1) sizer(2) sizer(1) sizer(1);
    margin:sizer(1.5) 0 0 0;
    &:hover{
      cursor:pointer;
    }
  }
  .not-linked:hover span{
    text-decoration: underline;
  }
  .not-linked span{
    float:right;
  }
</style>