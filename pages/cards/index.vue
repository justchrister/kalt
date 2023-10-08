<template>
  <main>
    <navbar-tabs />
    <block margin="half" v-if="cards">
      <div v-for="card of cards" :key="card.cardId" class="card" @click="setDefault(card.cardId)">
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
  const user = await get(supabase).user(userId.user.id)
  const cards = await get(supabase).paymentCards(user)
  
  if(1>cards.length) {
    ok.log('warn', 'no cards found')
    await navigateTo('cards/add')
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