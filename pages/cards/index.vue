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
<script setup>
  definePageMeta({
    pagename: 'Cards',
    middleware: ['default', 'auth']
  })
  useHead({
    title: 'Cards'
  })

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const { data, error } = await supabase
    .from('get_payment_cards')
    .select()
    .eq('user_id', user.value.id)
    .order('default', { ascending: false })
    
  if(1>data.length) {
    ok.log('warn', 'no cards found')
    await navigateTo('cards/add')
  }
  if(data) ok.log('success', 'got payment cards', data)
  if(error) ok.log('error', 'could not get payment cards', error)
  
  const setDefault = async (id) => {
    const { data, error } = await supabase
      .from('payment_cards')
      .insert({
        'message_sender': 'pages/cards/index.vue',
        'user_id': user.value.id,
        'card_id': id,
        'message_entity_id': id,
        'default': true
      })
    if(error) ok.log('error', 'could not set default card', error)
  }
</script>
<style scoped lang="scss">
  .dark-mode button{
    color:$light;
    border-color:$light;
  }
  .dark-mode button:hover{
    background:$dark;
  }
</style>