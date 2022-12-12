<script setup lang="ts">
  const pagename = "Cards";
  const title = "Kalt — " + pagename;
  const description = ref("My App Description");

  useHead({
    title,
    meta: [
      {
        name: "description",
        content: description,
      },
    ],
  });
  
const client = useSupabaseClient();
const user = useSupabaseUser();
const card_number = ref("");
const expiration_month = ref("");
const expiration_year = ref("");

//import charts = module('highcharts');

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
const chargeCard = async () => {
  const { data: transaction } = await useFetch('/api/transactions/createTransaction',{ 
      method: 'POST',
      body: {
        user_id: user.value.id,
        transaction_type: 0,
        amount: 2000, //get this from the URL
        currency: "NOK" //get this from account
      },
      server: false
  })
  navigateTo('/invest/complete')
}
</script>
<template>
  <div class="PageWrapper">
    <Kaltmenu :pageTitle='pagename' />
    <div class="page">
      <div class="section">
        <div class="block">
        <h3 v-if="cards"> Choose a card: </h3>

        <div v-for="card of cards" :key="card.card_number">
          <input type="number" id="card" min="1000000000000000" max="9999999999999999" placeholder="cards.card_number" style="width:60%;" v-model="card.card_number" disabled>
          <input type="number" v-model="card.expiration_month" id="month" min="1" max="12" placeholder="10"  style="width:11%;border-left:0;" disabled>
          <input type="number" v-model="card.expiration_year" id="year" min="2022" max="20230" placeholder="2023" style="width:15%;border-left:0;" disabled>
          <input type="password" id="cvc" v-model="card.cvc" placeholder="cvc" style="width:14%;border-left:0;" disabled>
          
          <button @click="chargeCard">
            use this card ->
          </button>

        </div>
        <br/>
        <br/>
        </div>
          <div class="block">
        <h3> Add a new card: </h3>

        <input type="number" id="card" min="1000000000000000" max="9999999999999999" placeholder="" style="width:60%;" v-model="card_number">
        <input type="number" v-model="expiration_month" id="month" min="1" max="12" placeholder="10"  style="width:11%;border-left:0;">
        <input type="number" v-model="expiration_year" id="year" min="2022" max="20230" placeholder="2023" style="width:15%;border-left:0;">
        <input type="number" id="cvv" placeholder="424" style="width:14%;border-left:0;">
        <a href="/invest/complete">
        <button @click="chargeCard">
          add card->
        </button>
        </a>
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
</style>