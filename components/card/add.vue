<template>
  <div>
    <form @submit.prevent="addCard">
      <div class="card" @click="removeMarkedAsWrong()">
        <div :class="checkBrand(number)"></div>
        <input 
          type="text" 
          id="number"
          :class="{ 'error-field': numberError }" 
          v-model="number" 
          minlength="19"
          v-maska data-maska="#### #### #### ####"
          placeholder="•••• •••• •••• 4242"/>
        <input 
          type="text" 
          :class="{ 'error-field': monthError }" 
          v-model="month" 
          v-maska data-maska="##"
          placeholder="12" />
        <input 
          type="text" 
          :class="{ 'error-field': yearError }" 
          v-model="year" 
          v-maska data-maska="##"
          placeholder="24" />
        <input 
          type="text" 
          :class="{ 'error-field': cvcError }" 
          v-model="cvc" 
          v-maska data-maska="###"
          placeholder="333" />
        </div>
      <button>
        add card <loading-icon v-if="loading" />
      </button>
    </form>
    <span v-if="notification" @click="setNotification(null)">
      <banner-notification color="yellow" :message="notification"/>
    </span>
  </div>
</template>
<script setup>
  const supabase = useSupabaseClient();
  const userId = useSupabaseUser();
  const number = ref();
  const numberError = ref(false);
  const month = ref();
  const monthError = ref(false);
  const year = ref();
  const yearError = ref(false);
  const cvc = ref('');
  const cvcError = ref(false);
  const loading = ref(false);
  const notification = ref();

  const setNotification = async (message) => {
    ok.log('error', message)
    notification.value=message
    loading.value=false
    return
  }
  const markAsWrong = async (field) => {
      
    switch (field) {
      case 'number':
        numberError.value = true;
        break;
      case 'month':
        monthError.value = true;
        break;
      case 'year':
        yearError.value = true;
        break;
      case 'cvc':
        cvcError.value = true;
        break;
    }
  }
  const removeMarkedAsWrong = async () => {
    numberError.value = false;
    monthError.value = false;
    yearError.value = false;
    cvcError.value = false;
  }

  const addCard = async () => {
    loading.value = true;
    const lastFourDigits = number.value.slice(-4)
    const numberInt = ok.toInt(number.value);
    const cvcInt = ok.toInt(cvc.value);
    const yearPrefix = new Date().getFullYear().toString().slice(0, 2); 
    const fullYear = parseInt(yearPrefix + year.value, 10); 
    const expiry = new Date(Date.UTC(fullYear, month.value - 1, 1));
    const today = new Date();
    const expired = expiry < new Date(today.getFullYear(), today.getMonth(), 1);

    ok.log('', {
      expiry,
      today,
      expired
    })
    const validCard = await ok.validateCard(numberInt)
    if(!validCard){
      setNotification ('Card number is invalid 😅')
      markAsWrong('number')
    } else if(16>numberInt.toString().length){
      setNotification ('Payment card number is too short')
      markAsWrong('number')
    } else if(!number.value){
      setNotification ('Card number is missing 😅')
      markAsWrong('number')
    } else if(!month.value){
      setNotification ('Expiry month is missing 😅')
      markAsWrong('month')
    } else if(12<month.value){
      setNotification ('Expiry month is set to '+month.value+' and it should be between 1 and 12 😅')
      markAsWrong('month')
    } else if(!year.value){
      setNotification ('Expiry year is missing 😅')
      markAsWrong('year')
    } else if(expired){
      setNotification ('Card is expired 😅')
      markAsWrong('month')
      markAsWrong('year')
    } else if(!cvc.value){      
      setNotification ('CVC is missing 😅 It can be found on the back of the card')
      markAsWrong('cvc')
    } else if(3>cvcInt.toString().length){      
      setNotification ('CVC is too short 😅')
      markAsWrong('cvc')
    } else {
      const error = await pub(supabase, {
        sender:'components/card/add.vue',
        entity: ok.uuid()
      }).paymentCards({
        'userId': userId.value.id,
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
        await navigateTo('/success/cards')
      }
    }
  }
  const checkBrand = (brand) => {
    if(brand){
      let firstDigit = brand.toString().slice(0,  1);
      if(firstDigit==='1') return "logo amex"
      if(firstDigit==='2') return "logo mastercard"
      if(firstDigit==='3') return "logo amex"
      if(firstDigit==='4') return "logo visa"
      if(firstDigit==='5') return "logo mastercard"
      if(firstDigit==='6') return "logo discover"
      if(firstDigit==='7') return "logo dinersclub"
      if(firstDigit==='8') return 'logo jcb'
      if(firstDigit==='9') return 'logo unionpay'
      return "logo"
    }
  }
</script>
<style scoped lang="scss">
  .card{
    display: grid; 
    grid-template-columns: 
      sizer(2) 
      1fr
      sizer(4.5) 
      sizer(4.5)
      sizer(6); 
    gap: 0px; 
    border: $border;
    padding: sizer(1) 
            sizer(2) ;
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
    margin-top: sizer(2);
  }
  .logo{
    background-size:contain;
    background-repeat: no-repeat;
    background-position: center center;
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
  .logo.discover{ 
    background-image: url('/media/icons/discover.svg');
  }
  .logo.dinersclub{ 
    background-image: url('/media/icons/dinersclub.png');
  }
  .logo.jcb{ 
    background-image: url('/media/icons/jcb.svg');
  }
  .logo.unionpay{ 
    background-image: url('/media/icons/unionpay.svg');
  }
  .error-field{
    color: $red;
    background: $red-20;
  }
  #number{

    transition: margin-left 0.5s;
  }
  .error-field#number{
    margin-left: sizer(1);
    transition: margin-left 0.5s;
  }
</style>