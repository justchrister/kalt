<template>
  <main>
    <block v-for="fund of funds" :key="fund.ticker">
      <fund :ticker="fund.ticker"/>
    </block>
  </main>
</template>
<script setup lang="ts">
const supabase = useSupabaseClient()
  let funds = [
    {
      'ticker': 'your',
      'name': 'your fund', 
      'description': 'your fund description'
    }
  ]
  const { data, error } = await supabase
    .from('sys_funds')
    .select()
    .neq('ticker', 'gi.ddf')
  for (let i = 0; i < data.length; i++) {
    funds.push(data[i])
  }
</script>
<style scoped lang="scss">
  
</style>