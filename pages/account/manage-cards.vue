
<template>
  <div class="PageWrapper">
    <navbar :pageTitle='pagename' />
    <div class="page">
      <div class="section">
        <div class="block"  v-if="cards.length">
          <h3> Your cards: </h3>

          <div v-for="card of cards" :key="card.card_id" class="card">
            <div :class="checkBrand(card.card_number)"></div> 
            <div class="details">  {{ "•••• •••• •••• " + card.card_number.toString().slice(-4) }}  </div>
            <div v-if="card.default" class="default">  default  </div>
            <div v-else="card.default" class="not default">  set default  </div>
          </div>
        </div>
        <div class="block add-card">
          <h3> Add a new card: </h3>
          <div class="card">
            <form @submit.prevent="addCard">
              <div class="card_number-group">
                <label for="card_number">card_number:</label> 
                <input 
                  type="number" 
                  v-model="card_number" 
                  placeholder="card_number" 
                  id="card_number" 
                  class="atom input-card_number" />
              </div>
              <div class="expiry_year-group">
                <label for="expiry_year">Expiry year:</label>
                <select v-model="expiry_year" id="expiry_year">
                  <option value="23">2023</option>
                  <option value="24">2024</option>
                  <option value="25">2025</option>
                  <option value="26">2026</option>
                  <option value="27">2027</option>
                  <option value="28">2028</option>
                  <option value="29">2029</option>
                  <option value="30">2030</option>
                  <option value="31">2031</option>
                  <option value="32">2032</option>
                </select>
              </div>
              <div class="expiry_month-group">
                <label for="expiry_month">Expiry month:</label>
                <select v-model="expiry_month" id="expiry_month">
                  <option value="1">01</option>
                  <option value="2">02</option>
                  <option value="3">03</option>
                  <option value="4">04</option>
                  <option value="5">05</option>
                  <option value="6">06</option>
                  <option value="7">07</option>
                  <option value="8">08</option>
                  <option value="9">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
              <div class="cvc-group">
                <label for="cvc">CVC:</label> 
                <input 
                    type="number" 
                    v-model="cvc" 
                    placeholder="424" 
                    id="cvc"
                    class="atom input-cvc" />
              </div>
              <input type="submit" value="add card and set as default">
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const pagename = "Payment";
  const title = "Kalt — " + pagename;
  const description = ref("My App Description");
  
  import { v4 as uuidv4 } from 'uuid';
  const new_card_id = ref(uuidv4())

  useHead({
    title,
    meta: [{
      name: "description",
      content: description,
    },],
  });
  
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  onMounted(() => {
    watchEffect(() => {
      if (!user.value) {
        navigateTo('/authenticate/sign-in')
      }
    });
  });

  let { data: cards } = await supabase
    .from('cards')
    .select()
    .eq('user_id', user.value.id)
    .order('default', { ascending: false })

  const checkBrand = (brand_id) => {
    let first_digit = brand_id.toString().slice(0,  1);
    if(first_digit==='2') return "logo mastercard"
    if(first_digit==='3') return "logo amex"
    if(first_digit==='5') return "logo mastercard"
    if(first_digit==='4') return "logo visa"
    if(first_digit==='6') return "logo discovery"
    return "ehm what?"
  }
  const card_number = ref('');
  const expiry_month = ref('');
  const expiry_year = ref('');
  const cvc = ref('');
  const addCard = async () => {
    const { error } = await supabase
    .from('cards')
    .insert({ 
      card_id: new_card_id.value,
      user_id: user.value.id,
      card_number: card_number.value,
      expiration_month: expiry_month.value,
      expiration_year: expiry_year.value,
      default: true,
      cvc: cvc.value })
    refreshNuxtData('cards')
  }

</script>