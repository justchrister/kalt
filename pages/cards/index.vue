<template>
  <main>
    <navbar-tabs />
    <block margin="half">
      <div v-for="card of data" :key="card.card_id" class="card" @click="setDefault(card.card_id)">
        <card :number="ok.toInt(card.card_number)" :default="card.default" />
      </div>
    </block>
    <block>
      <nuxt-link to="cards/add">
        <button>
          add card
        </button>
      </nuxt-link>
    </block>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Cards',
    middleware: 'auth'
  })
  useHead({
    title: 'Cards',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const { data, error } = await supabase
    .from('get_payment_cards')
    .select()
    .eq('user_id', user.value.id)
    
  if(1>data.length) {
    ok.log('warn', 'no cards found')
    await navigateTo('cards/add')
  }
  if(data) ok.log('success', 'got payment cards', data)
  if(error) ok.log('error', 'could not get payment cards', error)
  
  const setDefault = async (id) => {
    await resetDefaultCard();
    const { error } = await supabase
      .from('cards')
      .update({ default: true })
      .eq('card_id', id)
      .select()
//    refreshNuxtData()
  }
</script>
