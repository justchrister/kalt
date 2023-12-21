<template>
  <main>
    <navbar-tabs />
    <block margin="1" v-if="cards">
      <div v-for="card of cards" :key="card.message_entity" class="card" @click="setDefault(card.message_entity)">
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
  const user = await get(supabase).user(userId.value.id)
  const cards = await get(supabase).paymentCards(user)
  ok.log('', cards)
  if(cards && 1>cards.length) {
    ok.log('warn', 'no cards found')
    await navigateTo('cards/add')
  }
  const setDefault = async (id) => {
    await pub(supabase, {
      sender: 'pages/cards/index.vue',
      entity: id
    }).paymentCards({
      'userId': userId.value.id,
      'default': true
    });
    ok.log('', 'set default card: '+id)
    await navigateTo('/success/cards')
  }
</script>
<style scoped lang="scss">
/*
  .dark-mode button{
    color: $light;
    border-color: $light;
  }
  .dark-mode button:hover{
    background: $dark;
  }*/
</style>