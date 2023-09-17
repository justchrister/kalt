<template>
  <main v-if="data">
    <block v-for="fund of data" :key="fund.ticker">
      <fund :ticker="fund.ticker"/>
    </block>
  </main>
</template>
<script lang="ts" setup>
  const supabase = useSupabaseClient()
  definePageMeta({
    pagename: 'Funds'
  })
  useHead({
    title: 'Funds',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })
  const { data, error } = await supabase
    .from('sys_funds')
    .select()
    .neq('ticker', 'gi.ddf')
</script>
<style scoped lang="scss">
  
</style>