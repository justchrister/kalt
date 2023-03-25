<template>
  <main>
    <navbar :pageTitle="pagename" />
    <div class="page">
      <div class="section">
        <div class="add-card">
          <h3> Add a card to start investing </h3>
          <form @submit.prevent="addCard">
            <div class="card_number-group element input number">
              <label for="card_number">Card number:</label> 
              <input 
                type="text" 
                v-model="card_number" 
                v-maska data-maska="#### #### #### ####"
                placeholder="•••• •••• •••• 4242" 
                id="card_number" 
                class="atom input-card_number"/>
            </div>
            <div class="grid-col-2">
              <div>
                <div class="expiry_month-group element select">
                  <label for="expiry_month">Expiry date:</label>
                  <select v-model="expiry_month" id="expiry_month" placeholder="12">
                    <option value="MM">MM</option>
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
                <div class="expiry_year-group element select">
                  <label for="expiry_year"></label>
                  <select v-model="expiry_year" id="expiry_year">
                    <option value="YY">YY</option>
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
              </div>
              <div>
                <div class="element input number">
                  <label for="cvc">CVC:</label> 
                  <input 
                      type="string" 
                      v-model="cvc" 
                      v-maska data-maska="###"
                      placeholder="424" 
                      id="cvc"
                      class="atom input-cvc" />
                </div>
              </div>
            </div>
            <input type="submit" value="add card and set as default" class="atom square">
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
  const pagename = "Add card";
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
  const router = useRouter()

  const card_id = ref(okuuid())
  const card_number = ref('');
  const expiry_month = ref('MM');
  const expiry_year = ref('YY');
  const cvc = ref('');

  const resetDefaultCard = async () =>{
    const { data, error } = await supabase
      .from('cards')
      .update({ default: false })
      .eq('user_id', user.value.id)
  }
  const setDefaultCard = async (uuid) =>{
    const { data, error } = await supabase
      .from('cards')
      .update({ default: true })
      .eq('user_id', user.value.id)
      .eq('card_id', uuid)
  }
  const goBack = () => {
    router.go(-1)
  }
  const addCard = async () => {
    const card_number_int = card_number.value.replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '')
    const json = {
        "card_id": card_id.value,
        "user_id": user.value.id,
        "card_number": card_number_int,
        "expiration_month": expiry_month.value,
        "expiration_year": expiry_year.value,
        "default": true,
        "cvc": cvc.value
    }
    const { data, error } = await supabase
      .from('cards')
      .insert(json)
      .select()
      .single()
    if(error){
      oklog('error', error.message)
    }
    if(data) {
      await resetDefaultCard();
      await setDefaultCard(card_id.value);
      goBack()
    }
  }
</script>
