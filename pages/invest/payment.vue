<script setup lang="ts">
  const pagename = "Payment";
  const title = "Kalt — " + pagename;
  const description = ref("My App Description");

  useHead({
    title,
    meta: [{
      name: "description",
      content: description,
    },],
  });
  
  const client = useSupabaseClient();
  const user = useSupabaseUser();
  const card_id = ref(uuidv4())
  const invest_id = ref('')
  import { v4 as uuidv4 } from 'uuid';

  onMounted(() => {
    watchEffect(() => {
      if (!user.value) {
        navigateTo('/authenticate/sign-in')
      }
    });
  });

  const { data: cards } = await useFetch('/api/cards/getCards',{ 
      query: { user_id: user.value.id },
      server: false
  })

  const { data: exists, error } = await client.from('cache_invest').select('invest_id, card_id').eq('user_id', user.value.id)

  if(exists[0]){
    if(exists[0].invest_id) invest_id.value = exists[0].invest_id
  }

  async function updateCache(previousCardId){
    if(previousCardId) card_id.value=previousCardId
    try {
      const { data, error } = await client
        .from('cache_invest')
        .upsert({
          invest_id: invest_id.value, 
          card_id: card_id.value,
          user_id: user.value.id
        })
        .select()
    } catch (error) {
    } finally {
      navigateTo('/invest/complete')
    }
  }
  const card_number = ref('');
  const month = ref('');
  const year = ref('');
  const cvc = ref('');
  async function createCard(){
    try {
      const { data: card, error } = await client.from('cards')
        .insert({
          card_id: card_id.value,
          user_id: user.value.id,
          card_number: card_number.value,
          expiration_month: month.value,
          expiration_year: year.value,
          cvc: cvc.value
        })
    } catch (error) {
    } finally {
      navigateTo('/invest/complete')
    }
  }
</script>
<template>
  <div class="PageWrapper">
    <navbar :pageTitle='pagename' />
    <div class="page">
      <div class="section">
        <div class="block">
          
          <h3 v-if="cards"> Choose a card: </h3>

          <div v-for="card of cards" :key="card.card_id" @click="updateCache(card.card_id)">
            <input type="number"  :value="card.card_number" style="width:60%;" disabled>
            <input type="number" :value="card.expiration_month" style="width:11%;border-left:0;" disabled>
            <input type="number" :value="card.expiration_year" style="width:15%;border-left:0;" disabled>
            <input type="password" value="cvc" style="width:14%;border-left:0;" disabled>
          </div>
          <h3> Add a new card: </h3>
          <form @submit.prevent="createCard">
            <input type="number" v-model="card_number" placeholder="•••• •••• •••• ••••" style="width:60%;">
            <input type="number" v-model="month" style="width:11%;border-left:0;">
            <input type="number" v-model="year" style="width:15%;border-left:0;">
            <input type="number" v-model="cvc" style="width:14%;border-left:0;">
            <input type="submit" value="create card">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  input[type="month"]{
    
    max-width:33%;
    width:33%;
    display:inline-block;
  }
  
  input[type="checkbox"]{
    height:50px;
    width:50px;
    display:inline-block;
  }
</style>