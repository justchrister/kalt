
<template>
  <main>
    <intro title="Automatic investments" paragraph="Wealth is built over time, its always better to invest steadily than a single sum one time." />
    <block margin="1">
      <input-amount-invest-auto :amount="autoInvest.amount || 0"/>
    </block>
    <block margin="2">
      <label> Select interval: </label>
      <select-auto-invest-interval type="daily" :selected="selectedInterval" @click="selectInterval('daily')"/>
      <select-auto-invest-interval type="weekly" :selected="selectedInterval" @click="selectInterval('weekly')"/>
      <select-auto-invest-interval type="monthly" :selected="selectedInterval" @click="selectInterval('monthly')"/>
    </block>
    <block margin="1">
      <select-fund />
    </block>
    <block margin="1">
      <card />
    </block>
    <block margin="1">
      <link-group>
        <span class="center">add a button thing that says "activate" if the user is yet to have activated it, it should check that all requirements are fulfilled (card, fund set up). when clicked, it should change to "activating" with a loading icon beside it. When finished it should say "activated". Always with a text underneath that says "changes are saved automatically"</span> *
        <span class="center">Beneath it there should be a text that says deactivate</span>
      </link-group>
    </block>
  </main>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const userId = useSupabaseUser()
  const user = await get(supabase).user(userId.value.id)
  definePageMeta({
    pagename: 'Invest',
    middleware: 'auth'
  })
  useHead({
    title: 'Invest'
  })
  
  const autoInvest = await get(supabase).autoInvest(userId.value.id);
  const selectedInterval = ref(autoInvest.interval || 'daily')
  const selectInterval = async (interval) => {
    if(interval === 'monthly'){
      if(autoInvest.type === 'monthlyBeginning') {
        selectedInterval.value = 'monthlyBeginning';
      } else if(autoInvest.type === 'monthlyMiddle') {
        selectedInterval.value = 'monthlyMiddle';
      } else if(autoInvest.type === 'monthlyEnd') {
        selectedInterval.value = 'monthlyEnd';
      } else {
        selectedInterval.value = 'monthlyMiddle';
      }
    } else {
      selectedInterval.value = interval;
    }
  }
  ok.log('', autoInvest);

</script>
<style scoped lang="scss">
main{
  padding-top:0;
}
</style>