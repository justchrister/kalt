
<template>
  <main>
    <intro title="Automatic investments" paragraph="Wealth is built over time, its always better to invest steadily than a single sum one time." />
    <block margin="1">
      <input-invest :initialAmount="autoInvest.amount" type="autoInvest"/>
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
      <input-button @click="toggleAutoInvestments(true)">
        {{ activeText }}
        <loading-icon v-if="activeText==='activating' || activeText==='pausing'" />
      </input-button>
      <div class="center-text">
        <span class="deactivate" @click="toggleAutoInvestments(false)">pause automation</span>
         •
        <span>changes are saved automatically</span>
      </div>
      <div class="center-text">
      </div>
    </block>
    <span v-if="notification" @click="setNotification(null)">
      <banner-notification color="yellow" :message="notification"/>
    </span>
  </main>
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value)
  const notification = ref();
  definePageMeta({
    pagename: 'Invest',
    middleware: 'auth'
  })
  useHead({
    title: 'Invest'
  })
  
  const setNotification = async (message: string) => {
    if(message) {
      ok.log('warn', message)
    }
    notification.value=message
    loading.value=false
    return
  }

  const autoInvest = await get(supabase).autoInvest(user.id);
  const selectedInterval = ref(autoInvest.interval)
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

  const updateAutoInvestments = async (activeStatus) => {
    const error = await pub(supabase, {
      sender:'pages/invest/auto.vue',
      id: user?.id
    }).autoInvest({
      active: activeStatus
    });
    if(error) {
      ok.log('error', 'could not update autoInvestments'+ error)
      return 'error'
    } else{
      if(activeStatus){
        active.value=true
      } else {
        active.value=false
      }
      ok.log('success', 'updated autoInvestments 🥰')
      return 'success'
    }
  }
  const active=ref(autoInvest.active || false)
  const activeText = ref(autoInvest.active ? 'active' : 'activate')
  const userHasCard = async () => {
    const card = await get(supabase).card(user);
    if(card){
      return true
    } else {
      return false
    }
  }
  const toggleAutoInvestments = async (status) => {
    const hasCard =await userHasCard();
    if(!hasCard){
      setNotification ('Please add a payment card')
      return
    }
    // on
    if(active.value && status){
      activeText.value = 'active'
      return
    } else if(!active.value && status){
      activeText.value = 'activating'
      const updated = await updateAutoInvestments(true)
      await ok.sleep(200)
      if(updated==='success'){
        activeText.value = 'active'
      } else {
        activeText.value = 'activate'
      }
    }
    // off
    if(!status && active.value){
      activeText.value = 'pausing'
      const updated = await updateAutoInvestments(false)
      await ok.sleep(200)
      if(updated==='success'){
        activeText.value = 'activate'
      } else {
        activeText.value = 'active'
      }
    }
  }
  ok.log('', autoInvest);
</script>
<style scoped lang="scss">
  main{
    padding-top:0;
  }
  .deactivate{
    text-decoration:underline;
    &:hover{
      cursor:pointer;
    }
  }
</style>