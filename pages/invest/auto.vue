
<template>
  <main>
    <intro title="Automatic investments"
      paragraph="Wealth is built over time, its always better to invest steadily than a single sum one time." />
    <navbar-tabs />
    <block margin="1">
      <input-invest :initialAmount="autoInvest?.amount" type="autoInvest" />
    </block>
    <block margin="2">
      <label> Select interval: </label>
      <select-auto-invest-interval type="daily" :selected="selectedInterval" @click="selectInterval('daily')" />
      <select-auto-invest-interval type="weekly" :selected="selectedInterval" @click="selectInterval('weekly')" />
      <select-auto-invest-interval type="monthly" :selected="selectedInterval" @click="selectInterval('monthly')" />
    </block>
    <block margin="1">
      <select-fund />
    </block>
    <block margin="1">
      <input-button @click="toggleAutoInvestments(true)">
        {{ activeText }}
        <loading-icon v-if="activeText === 'activating' || activeText === 'pausing'" />
      </input-button>
      <div class="center-text">
        <span class="deactivate" v-if="active" @click="toggleAutoInvestments(false)">pause automation</span>
        <span class="deactivate" v-else>automation is active</span>
      </div>
    </block>
    <span v-if="notification" @click="setNotification('')">
      <banner-notification color="yellow" :message="notification" />
    </span>
  </main>
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;
  const notification = ref();
  const loading = ref(false);
  definePageMeta({
    pagename: 'Invest',
    middleware: 'auth'
  })
  useHead({
    title: 'Invest'
  })

  const setNotification = async (message: string) => {
    notification.value = message
    loading.value = false
    return
  }

  const autoInvest = await get(supabase).autoInvest(user) as autoInvest;
  const selectedInterval = ref(autoInvest?.interval || null) as autoInvestIntervals;
  const selectInterval = (interval: string) => {
    if (interval === 'monthly') {
      if (autoInvest.interval === 'monthlyBeginning') {
        selectedInterval.value = 'monthlyBeginning';
      } else if (autoInvest.interval === 'monthlyMiddle') {
        selectedInterval.value = 'monthlyMiddle';
      } else if (autoInvest.interval === 'monthlyEnd') {
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
      sender: 'pages/invest/auto.vue',
      id: user?.id
    }).autoInvest({
      active: activeStatus
    });
    if (error) {
      ok.log('error', 'could not update updateAutoInvestments: '+error.message)
      return 'error'
    } else {
      if (activeStatus) {
        active.value = true
      } else {
        active.value = false
      }
      ok.log('success', 'updated autoInvestments')
      return 'success'
    }
  }
  const active = ref(autoInvest?.active || false)
  const activeText = ref(autoInvest?.active ? 'active' : 'activate')
  const toggleAutoInvestments = async (status: boolean) => {
    // on
    if (active.value && status) {
      activeText.value = 'active'
      return
    } else if (!active.value && status) {
      activeText.value = 'activating'
      const updated = await updateAutoInvestments(true)
      await ok.sleep(200)
      if (updated === 'success') {
        activeText.value = 'active'
      } else {
        activeText.value = 'activate'
      }
    }
    // off
    if (!status && active.value) {
      activeText.value = 'pausing'
      const updated = await updateAutoInvestments(false)
      await ok.sleep(200)
      if (updated === 'success') {
        activeText.value = 'activate'
      } else {
        activeText.value = 'active'
      }
    }
  }
</script>
<style scoped lang="scss">
  main {
    padding-top: 0;
  }
  .deactivate {
    font-size:75%;

    &:hover {
      cursor: pointer;
    }
  }
</style>