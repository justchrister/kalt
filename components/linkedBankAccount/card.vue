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
      LT83 7044 0600 0338 1770
    </div>
    <div>
      Bank code (BIC/SWIFT)
    </div>
    <div class="right">
      CBVILT2XXXX
    </div>
    <div>
      Reference text
    </div>
    <div class="right">
      Manual transfer (default)
    </div>
  </div>
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

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