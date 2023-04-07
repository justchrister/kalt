<template>
  <div>
    <form @submit.prevent="addCard">
      <div :class="checkBrand(card_number)"></div>
      <input 
        type="text" 
        v-model="card_number" 
        v-maska data-maska="#### #### #### ####"
        placeholder="•••• •••• •••• 4242"/>
      <input 
        type="text" 
        v-model="expiry_month" 
        v-maska data-maska="##"
        placeholder="12" />
      <input 
        type="text" 
        v-model="expiry_year" 
        v-maska data-maska="##"
        placeholder="24" />
      <input 
        type="text" 
        v-model="cvc" 
        v-maska data-maska="###"
        placeholder="333" />
    </form>
    <button @click="addCard()">
      add card
    </button>
  </div>
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const card_id = ref(ok.uuid())
  const card_number = ref();
  const expiry_month = ref();
  const expiry_year = ref();
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
      ok.log('error', error.message)
    }
    if(data) {
      await resetDefaultCard();
      await setDefaultCard(card_id.value);
      goBack()
    }
  }

  const checkBrand = (brand_id) => {
    if(brand_id){
      let first_digit = brand_id.toString().slice(0,  1);
      if(first_digit==='2') return "logo mastercard"
      if(first_digit==='3') return "logo amex"
      if(first_digit==='5') return "logo mastercard"
      if(first_digit==='4') return "logo visa"
      if(first_digit==='6') return "logo"
      return "ehm what?"
    }
  }
</script>
<style scoped lang="scss">
form{
  display: grid; 
  grid-template-columns: 
    $clamp-2 
    1fr
    $clamp-4 
    $clamp-4 
    clamp($unit-min*5, $unit*5, $unit-max*5); 
  gap: 0px; 
  border:$border;
  padding:$clamp 
    $clamp-2 ;
}
input{
  display:inline-block;
  width:auto;
  border:none;
  &:focus{
    background:none;
  }
}
button{
  margin-top:$clamp-2;
}
.logo{
  background-size:contain;
  background-repeat: no-repeat;
  background-position: center left;
}
.logo.visa{ 
  background-image: url('/media/icons/visa.svg');
}
.logo.mastercard{ 
  background-image: url('/media/icons/mastercard.svg');
}
.logo.amex{ 
  background-image: url('/media/icons/amex.svg');
}
</style>