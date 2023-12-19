<template>
  <div class="card">
    <div>
      Balance
    </div>
    <div class="right">
      {{accountBalance}}
    </div>
    <div>
      Auto invest
    </div>
    <div class="right">
      {{ok.toPercent(user.autoVest)}}
    </div>
    <div>
      Preferred currency
    </div>
    <div class="right">
      {{user.currency}}
    </div>
  </div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const userId = useSupabaseUser()
  const user = await get(supabase).user(userId.value.id)
  const accountBalance = await get(supabase).accountBalance(user)
</script>
<style scoped lang="scss">
  .card{
    box-sizing: border-box;
    border:$border;
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
    color:$blue;
  }
  /*
  .dark-mode .card{
    border-color:$light;
  }
  */
</style>