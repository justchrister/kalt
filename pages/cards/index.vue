<template>
  <main>
    <navbar :pageTitle="pagename" />
    <div class="page">
      <div class="section">
        <navbar-tabs />
        <div v-for="card of cards" :key="card.card_id" class="card" @click="setDefault(card.card_id)">
          <div :class="checkBrand(card.card_number)"></div> 
          <div class="details">  {{ "•••• •••• •••• " + card.card_number.toString().slice(-4) }}  </div>
          <div :class="'default '+card.default"> <span class="set"> set </span> default  </div>
        </div>
        <nuxt-link to="cards/add">
          <button>
            add card
          </button>
        </nuxt-link>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
  const pagename = "Cards";
  const title = "Kalt — " + pagename;
  useHead({
    title,
    meta: [{
      name: "description",
      content: "Make money, make a difference."
    }]
  });
  definePageMeta({
    middleware: 'auth'
  });

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

  const checkBrand = (brand_id) => {
    let first_digit = brand_id.toString().slice(0,  1);
    if(first_digit==='2') return "logo mastercard"
    if(first_digit==='3') return "logo amex"
    if(first_digit==='5') return "logo mastercard"
    if(first_digit==='4') return "logo visa"
    if(first_digit==='6') return "logo"
    return "ehm what?"
  }

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
