
<template>
  <main>
    <intro title="Automatic investments" paragraph="Wealth is built over time, its always better to invest steadily than a single sum one time." />
    <block margin="1">
      <input-amount-invest-auto :amount="subscription.amount || 0"/>
    </block>
    <block margin="2">
      <label> Select interval: </label>
      <intervalSelector type="daily" :selected="dailySelected" @click="select('daily')"/>
      <intervalSelector type="weekly" :selected="weeklySelected" @click="select('weekly')"/>
      <intervalSelector type="monthly" :selected="monthlySelected" @click="select('monthly')"/>
    </block>
    <block margin="1">
      <select-fund />
    </block>
    <block margin="1">
      <card-default />
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
    pagename: 'Subscription',
    middleware: 'auth'
  })
  useHead({
    title: 'Subscription'
  })
  
  const dailySelected = ref(true);
  const weeklySelected = ref(false);
  const monthlySelected = ref(false);

  const select = (iteration) => {
    ok.log('', iteration)
    if(iteration==='daily'){
      dailySelected.value = true;
      weeklySelected.value = false;
      monthlySelected.value = false;
    } else if (iteration==='weekly'){
      dailySelected.value = false;
      weeklySelected.value = true;
      monthlySelected.value = false;
    } else if (iteration==='monthly'){
      dailySelected.value = false;
      weeklySelected.value = false;
      monthlySelected.value = true;
    }
  }
  const defaultCard = await get(supabase).defaultPaymentCard(user);
  if(!defaultCard){
    ok.log('error', 'User does not have default card')
    await navigateTo('/cards')
  }
  const subscription = await get(supabase).subscription(userId.value.id);
  ok.log('', subscription)
  
</script>
<style scoped lang="scss">
main{
  padding-top:0;
}
</style>