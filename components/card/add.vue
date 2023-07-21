<template>
  <div>
    <form @submit.prevent="addCard">
      <div class="card">
        <div :class="checkBrand(card_number)"></div>
        <input 
          type="text" 
          v-model="card_number" 
          minlength="19"
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
        </div>
      <button>
        add card <loading-icon v-if="loading" />
      </button>
    </form>
    <notification-fixed :type="notification.type" :message="notification.message" v-if="notification.message"/>
  </div>
</template>
<script setup>
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const card_number = ref();
  const expiry_month = ref();
  const expiry_year = ref();
  const cvc = ref('');
  const loading = ref(false);
  const notification = ref({
    type: null, 
    message: null
  });

  const addCard = async () => {
    const last_four_digits = card_number.value.slice(-4)
    const cardNumberInt = ok.toInt(card_number.value);
    loading.value = true;


    if(!card_number.value){
      notification.value={
        type: 'error',
        message: 'Card number is missing 😅'
      }
      ok.log(notification.value.type, notification.value.message)
      return
    }

    if(!expiry_month.value){
      notification.value={
        type: 'error',
        message: 'Expiry month is missing 😅'
      }
      ok.log(notification.value.type, notification.value.message)
      return
    }


    if(!card_number.value){
      notification.value={
        type: 'error',
        message: 'Expiry year is missing 😅'
      }
      ok.log(notification.value.type, notification.value.message)
      return
    }

    if(!card_number.value){
      notification.value={
        type: 'error',
        message: 'CVC is missing 😅 It can be found on the back of the card'
      }
      ok.log(notification.value.type, notification.value.message)
      return
    }

    if(16>cardNumberInt.toString().length){
      notification.value={
        type: 'error',
        message: 'Payment card number is too short'
      };
      ok.log(notification.value.type, notification.value.message)
      loading.value = false;
      return
    }

    if(12<expiry_month.value){
      notification.value={
        type: 'error',
        message: 'Expiry month is set to '+expiry_month.value+' and it should be between 1 and 12 😅'
      }
      ok.log(notification.value.type, notification.value.message)
      return
    }
    const card_id = ok.uuid();
    const { data, error } = await supabase
      .from('payment_cards')
      .insert({
        'message_sender': 'component/card/add.vue',
        'message_entity_id': card_id,
        'user_id': user.value.id,
        'card_id': card_id,
        'last_four_digits': last_four_digits,
        'card_number': cardNumberInt,
        'expiry_month': expiry_month.value,
        'expiry_year': expiry_year.value,
        'cvc': cvc.value,
        'default': true
      })
    if(error){
      ok.log('error', 'could not add card', error)
      loading.value=false
    } else {
      loading.value=false
      goBack()
    }
  }
  
  const router = useRouter()
  const goBack = () => {
    router.go(-1)
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
.card{
  display: grid; 
  grid-template-columns: 
    $clamp-2 
    1fr
    $clamp-4 
    $clamp-4 
    $clamp-5; 
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
.dark-mode{
  .logo.visa{ 
    background-image: url('/media/icons/visa-light.svg');
  }
}
</style>