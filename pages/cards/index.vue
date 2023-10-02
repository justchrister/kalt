<template>
  <main>
    <navbar-tabs />
    <block margin="half">
      <div v-for="card of data" :key="card.cardId" class="card" @click="setDefault(card.cardId)">
        <card :number="card.number" :default="card.default" />
      </div>
    </block>
    <block>
      <nuxt-link to="/cards/add">
        <button>
          add card
        </button>
      </nuxt-link>
    </block>
  </main>
</template>
<script setup>
  definePageMeta({
    pagename: 'Cards',
    middleware: 'auth'
  })
  useHead({
    title: 'Cards'
  })

  const supabase = useSupabaseClient()
  const userId = useSupabaseUser()
  const { data, error } = await supabase
    .from('getPaymentCards')
    .select()
    .eq('userId', userId.value.id)
    .gte('number', 1)
    .order('default', { ascending: false })
  
  if(1>data.length) {
    ok.log('warn', 'no cards found')
    await navigateTo('cards/add')
  }
  if(error) {
    ok.log('error', 'could not get payment cards', error)
  } else {
    let cardArray= [];
    for (let i = 0; i < data.length; i++) {
      const card = data[i];
      cardArray.push('•••• •••• •••• '+card.lastFourDigits)
    }
    ok.log('success', 'got payment cards:', cardArray)
  }
  const setDefault = async (id) => {
    const { error } = await pub(supabase, {
      sender: 'pages/cards/index.vue',
      entity: id
    }).paymentCards({
      'userId': userId.value.id,
      'default': true
    });
    if(error) {
      ok.log('error', 'could not set default card', error)
    } else {
      ok.log('', 'set default card: '+id)
      await navigateTo('/success/cards')
    }
  }
</script>
<style scoped lang="scss">
/*
  .dark-mode button{
    color:$light;
    border-color:$light;
  }
  .dark-mode button:hover{
    background:$dark;
  }*/
</style>