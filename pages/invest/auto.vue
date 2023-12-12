
<template>
  <main>
    <intro title="Build your own fund" paragraph="Choose what you want to invest in both through your subscription and when completing single investments." />
    <block margin="1">
      <input-amount-subscription :amount="subscription.amount || 0"/>
    </block>
    <block margin="2">
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
      <button class="half"> save </button>
      <span class="center">stop automatic investments</span>
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