<template>
  <div class="card">
    <div class="bold transfer">
      Deposit details
    </div>
    <div>
    </div>
    <div>
      Name
    </div>
    <div class="right">
      Kalt LLC
    </div>
    <div>
      E-mail
    </div>
    <div class="right">
      transfers@ka.lt
    </div>
    <div>
      IBAN
    </div>
    <div class="right">
      EN83 7044 0600 0338 1770
    </div>
    <div>
      Bank code (SWIFT)
    </div>
    <div class="right">
      KLTT2XXXX
    </div>
    <div>
      Reference
    </div>
    <div class="right">
      {{user.email}}
    </div>
  </div>
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;
</script>
<style scoped lang="scss">
  .card{
    box-sizing: border-box;
    padding: sizer(1) sizer(2);
    display: grid;
    grid-template-columns: 1fr 1fr;
    @include border;
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
  }
  */
</style>