<template>
  <div>
    <form @submit.prevent="addCard">
      <div class="card">
        <div :class="checkBrand(number)"></div>
        <input 
          type="text" 
          v-model="number" 
          minlength="19"
          v-maska data-maska="#### #### #### ####"
          placeholder="•••• •••• •••• 4242"/>
        <input 
          type="text" 
          v-model="month" 
          v-maska data-maska="##"
          placeholder="12" />
        <input 
          type="text" 
          v-model="year" 
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
  const number = ref();
  const month = ref();
  const year = ref();
  const cvc = ref('');
  const loading = ref(false);
  const notification = ref({
    type: null, 
    message: null
  });

  const addCard = async () => {
    const lastFourDigits = number.value.slice(-4)
    const numberInt = ok.toInt(number.value);
    loading.value = true;


    if(!number.value){
      notification.value={
        type: 'error',
        message: 'Card number is missing 😅'
      }
      ok.log(notification.value.type, notification.value.message)
      return
    }

    if(!month.value){
      notification.value={
        type: 'error',
        message: 'Expiry month is missing 😅'
      }
      ok.log(notification.value.type, notification.value.message)
      return
    }


    if(!year.value){
      notification.value={
        type: 'error',
        message: 'Expiry year is missing 😅'
      }
      ok.log(notification.value.type, notification.value.message)
      return
    }

    if(!number.value){
      notification.value={
        type: 'error',
        message: 'CVC is missing 😅 It can be found on the back of the card'
      }
      ok.log(notification.value.type, notification.value.message)
      return
    }

    if(16>numberInt.toString().length){
      notification.value={
        type: 'error',
        message: 'Payment card number is too short'
      };
      ok.log(notification.value.type, notification.value.message)
      loading.value = false;
      return
    }

    if(12<month.value){
      notification.value={
        type: 'error',
        message: 'Expiry month is set to '+month.value+' and it should be between 1 and 12 😅'
      }
      ok.log(notification.value.type, notification.value.message)
      return
    }
    ok.log('', user.value.id)
    const { error } = await pub(supabase, {
      sender:'components/card/add.vue',
      entity: ok.uuid()
    }).paymentCards({
      'userId': user.value.id,
      'lastFourDigits': lastFourDigits,
      'number': numberInt,
      'month': month.value,
      'year': year.value,
      'cvc': cvc.value,
      'default': true
    });
    if(error){
      ok.log('error', 'could not add card', error)
      loading.value=false
    } else {
      loading.value=false
      await navigateTo('/cards/success')
    }
  }
  const checkBrand = (brand) => {
    if(brand){
      let firstDigit = brand.toString().slice(0,  1);
      if(firstDigit==='2') return "logo mastercard"
      if(firstDigit==='3') return "logo amex"
      if(firstDigit==='5') return "logo mastercard"
      if(firstDigit==='4') return "logo visa"
      if(firstDigit==='6') return "logo"
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
    $clamp-4-5 
    $clamp-4-5
    $clamp-6; 
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
/*
.dark-mode{
  button,
  .card{
    border-color:$light;
  }
  button{
    color:$light;
  }
  .logo.visa{ 
    background-image: url('/media/icons/visa-light.svg');
  }
}
*/
</style>