<template>
  <main>
    <navbar-tabs />
    <block margin="half">
      <div v-for="card of cards" :key="card.card_id" class="card" @click="setDefault(card.card_id)">
        <card :number="card.card_number" :default="card.default" />
      </div>
    </block>
    <block>
      <p>Add a card: </p>
      <card-add />
    </block>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Cards',
    middleware: 'auth'
  })
  useHead({
    title: 'Kalt — Cards',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })

  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  import { v4 as uuidv4 } from 'uuid';
  const new_card_id = ref(uuidv4())

  const { data: cards } = await useLazyAsyncData('cards', async () => {
    const { data, error } = await supabase
      .from('cards')
      .select()
      .eq('user_id', user.value.id)
      .order('modified_at', { ascending: false })
    return data
  })
  const expiry_date = ref('')
  const expiry_month_test = ref(expiry_date.value.slice(0,2))

  const resetDefaultCard = async () => {
    const { data: defaultCard, error: remove } = await supabase
      .from('cards')
      .update({ default: false })
      .eq('user_id', user.value.id)
      // for each loop
  }
  
  // push data to cards array
  const setDefault = async (id) => {
    await resetDefaultCard();
    const { error } = await supabase
      .from('cards')
      .update({ default: true })
      .eq('card_id', id)
      .select()
    refreshNuxtData()
  }
</script>
