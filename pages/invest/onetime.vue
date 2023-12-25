<template>
  <main>
    <block margin="half">
      <h1>
        Let's invest in the future, today! <omoji emoji="✨" />
      </h1>
    </block>
    <block margin="1">
      <input-amount-invest  :uuid="uuid" />
    </block>
    <block margin="1">
      <select-fund />
    </block>
    <block margin="1">
      <input-button @click="completeTransaction()">
        Invest <loading-icon v-if="loading" />
      </input-button>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Invest',
    middleware: 'auth'
  })
  useHead({
    title: 'Invest',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
  const supabase = useSupabaseClient()
  const userId = useSupabaseUser()
  const uuid = ok.uuid();
  const loading = ref(false)
  const completeTransaction = async () => {
    loading.value = true
    const error = await pub(supabase, {
      sender: 'pages/invest/index.vue',
      entity: uuid
    }).accountTransactions({
      userId: userId.value.id,
      type: 'deposit',
      subType: 'card',
      status: 'pending',
      autoVest: 1
    });
    if(error){
      ok.log('error', 'could not create transaction', error)
      loading.value = false
    } else {
      ok.log('success', 'transaction created')
      ok.sleep(250)
      loading.value = false;
      navigateTo('/portfolio')
    };
  }
</script>
<style scoped lang="scss">
  
</style>