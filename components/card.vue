<template>
  <div>

    <div class="card" @click="edit=true" v-if="!edit">
      <div :class="checkBrand(number)"></div>
      <div class="details">  {{ "•••• •••• •••• " + fourDigits }}  </div>
      <div class="edit"> edit </div>
    </div>
    <div class="card selected" v-if="edit">
      <div :class="checkBrand(number)"></div>
      <div class="details" @click="removeMarkedAsWrong()"> 
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
          id="month"
          :class="{ 'error-field': monthError }" 
          v-model="month" 
          v-maska data-maska="##"
          placeholder="12" />
        <input 
          type="text" 
          id="year"
          :class="{ 'error-field': yearError }" 
          v-model="year" 
          v-maska data-maska="##"
          placeholder="24" />
        <input 
          type="text" 
          id="cvc"
          :class="{ 'error-field': cvcError }" 
          v-model="cvc" 
          v-maska data-maska="###"
          placeholder="333" />
      </div>
      <div class="edit" @click="saveCard()">  <loading-icon v-if="loading" /><span v-else>save</span></div>
    </div>

    <span v-if="notification" @click="setNotification(null)">
      <banner-notification color="yellow" :message="notification"/>
    </span>
  </div>

</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth) as user;
  const defaultCard = await get(supabase).paymentCard(user);
  const edit = ref(false);
  if(!defaultCard) {
    ok.log('', 'User does not have default card')
    edit.value=true;
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
      if(firstDigit==='8') return 'logo jcb'
      if(firstDigit==='9') return 'logo unionpay'
      return "logo"
    }
  }
  const number = ref(defaultCard?.number || '');
  const numberError = ref(false);
  const month = ref(defaultCard?.month || '');
  const monthError = ref(false);
  const year = ref(defaultCard?.year || '');
  const yearError = ref(false);
  const cvc = ref(defaultCard?.cvc || '');
  const cvcError = ref(false);
  const loading = ref(false);
  const notification = ref();
  const fourDigits = ref(number.value.toString().slice(-4) || '');
  const setFourDigits = () => {
    fourDigits.value = number.value.toString().slice(-4);
  }

  const setNotification = async (message) => {
    if(message) {
      ok.log('error', message)
    }
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
  const saveCard = async () => {
    loading.value = true;
    const numberInt = ok.toInt(number.value);
    const cvcInt = ok.toInt(cvc.value);
    const yearPrefix = new Date().getFullYear().toString().slice(0, 2); 
    const fullYear = parseInt(yearPrefix + year.value, 10); 
    const expiry = new Date(Date.UTC(fullYear, month.value - 1, 1));
    const today = new Date();
    const expired = expiry < new Date(today.getFullYear(), today.getMonth(), 1);
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
        'userId': user.id,
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
        setFourDigits(number.value);
        setNotification(null);
        edit.value=false;
      }
    }
  }
</script>
<style scoped lang="scss">
  
  .card{
    padding: sizer(1) sizer(2);
    margin: sizer(1) 0;
    max-height: sizer(4);
    display:grid;
    grid-template-columns: sizer(4) 1fr sizer(3);
    gap: sizer(2);
    overflow:hidden;
    @include border;
    @include hoverable;
  }
  .card.selected{
    @include selected;
  }
  .card:hover{
    @include hovering;
  }
  .card .logo{
    width: sizer(4);
    height: sizer(4);
    background: transparent;
    background-size: contain;
    display:inline-block;
    background-repeat: no-repeat;
    background-position: center center;
    box-sizing: border-box;
    vertical-align: top;
  }  
  .card .details{
    height: sizer(4);
    line-height: sizer(4);
    display:grid;
    grid-template-columns: 1fr;
    vertical-align: center;
  }
  .card.selected .details{
    width:sizer(36);
    grid-template-columns: 1fr sizer(5) sizer(5) sizer(6);
  }
  .card .edit{
    height: sizer(4);
    line-height: sizer(4);
    float:right;
    text-align:right;
  }
  input#number,
  input#year,
  input#month,
  input#cvc,
  input{
    transition:background-color 0.2s $easing-in;
  }
  input#number,
  input#year,
  input#month{
    border-right:0px solid transparent;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  input#cvc,
  input#year,
  input#month{
    text-align: center;
    border-left:$border;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
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
    background-color: $red-20;
    transition:background-color 0.2s $easing-in;
  }
</style>