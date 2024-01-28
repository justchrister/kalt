<template>
  <div>
    <label v-if="!editing">Card to charge:</label>
    <div class="card" v-if="!editing">
      <div :class="'logo ' + brand || 'mastercard'"></div>
      <div class="details">  {{ "•••• •••• •••• " + lastFourDigits }}  </div>
      <div class="edit" @click="editCard(storedCard)"> edit </div>
    </div>

    <label v-if="editing">Set card to charge: </label>
    <div class="card editing" v-if="editing">
      <div :class="'logo ' + brand"></div>
      <div class="details"> 
        <input 
          type="text" 
          id="number"
          :class="{ 'error-field': numberError }" 
          v-model="number" 
          minlength="19"
          @input="updateBrand(number)"
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
      <div class="edit" @click="saveCard(user, number, month, year, cvc)">  <loading-icon v-if="loading" /><span v-else>save</span></div>
    </div>
    <span v-if="notification" @click="setNotification(null)">
      <banner-notification color="yellow" :message="notification"/>
    </span>
  </div>

</template>
<script setup lang="ts">
  import { loadStripe } from "@stripe/stripe-js";

  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;
  const stripePromise = loadStripe('pk_test_51IMoMpDBFB40Q48wJYOe24B4jfH6W3UYyRAduNHLP5o8IER2ML2cAMoxGKdwKkYnGBkFoe1dJzdPxj2cPJjfgg6000tUWGXJvZ');

  const storedCard = await get(supabase).card(user);

  const editing = ref(false);
  const loading = ref(false);
  const notification = ref();

  const number = ref();
  const month = ref();
  const year = ref();
  const cvc = ref();

  const brand = ref();
  const lastFourDigits = ref();

  const numberError = ref();
  const monthError = ref();
  const yearError = ref();
  const cvcError = ref();

  if(!storedCard) {
    ok.log('', 'User does not have default card');
    editing.value=true;
  } else {
    brand.value=storedCard.brand;
    lastFourDigits.value=storedCard.lastFourDigits;
    month.value=storedCard.month;
    year.value=storedCard.year;
  };

  const setNotification = async (message: string) => {
    if(message) {
      ok.log('error', message)
    }
    notification.value=message
    loading.value=false
    return
  };

  const unencryptCard = async (storedCard: card) => {
    const key = await get(supabase).key(user);

    const numberHash = { 'iv': storedCard.numberIv, 'content': storedCard.number } as Hash;
    const cvcHash = { 'iv': storedCard.cvcIv, 'content': storedCard.cvc } as Hash;

    const unencryptedNumber = await cryptography.decrypt(key, numberHash);
    const unencryptedCvc = await cryptography.decrypt(key, cvcHash);
    
    number.value = unencryptedNumber;
    cvc.value = unencryptedCvc;
  };

  const updateBrand = (number) => {
    if(number || !loading.value){
      let firstDigit = number.slice(0, 1);
      if(firstDigit==='1') brand.value='amex'
      if(firstDigit==='2') brand.value='mastercard'
      if(firstDigit==='3') brand.value='amex'
      if(firstDigit==='4') brand.value='visa'
      if(firstDigit==='5') brand.value='mastercard'
      if(firstDigit==='6') brand.value='discover'
      if(firstDigit==='8') brand.value='jcb'
      if(firstDigit==='9') brand.value='unionpay'
    }
  }

  const editCard = async (storedCard: card) => {
    editing.value=true
    loading.value=true
    await unencryptCard(storedCard);
    loading.value=false
  }

  const generateStripeToken = async (user: user, card: card) => {
    const stripe = await stripePromise;
    if (!stripe) {
      console.log('Stripe not loaded');
      return;
    }
    const name = user.firstName + ' ' + user.lastName;
    const { token, error } = await stripe.createToken({
        number: card.number,
        exp_month: card.month,
        exp_year: card.year,
        cvc: card.cvc,
        name: name,
      });

    if (error) {
      console.log('Error:', error);
      return;
    }

    if (token) {
      console.log('Token:', token);
      return token
    }
    return null
  }

  const encryptAndStoreCard = async (user: user, card: card, token: string) => {
    const key = await get(supabase).key(user);
    const encryptedNumber = await cryptography.encrypt(key, card.number);
    const encryptedCvc = await cryptography.encrypt(key, card.cvc);
    const error = await pub(supabase, {
      sender:'components/card/add.vue',
      id: user.id
    }).cards({
      'userId': user.id,
      'number': encryptedNumber?.content,
      'numberIv': encryptedNumber?.iv,
      'month': card.month,
      'year': card.year,
      'cvc': encryptedCvc?.content,
      'cvcIv': encryptedCvc?.iv,
      'paymentProviderToken': token,
      'default': true
    } as card);
    if(error){
      ok.log('error', 'could not add card', error)
    }
  }

  const removeMarkedAsWrong = async () => {
    numberError.value = false;
    monthError.value = false;
    yearError.value = false;
    cvcError.value = false;
  }

  const markAsWrong = (field: string) => {
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

  const validateCard = async (number: number, month: number, year: number, cvc: number) => {
    ok.log('', 'cvc '+cvc)
    const yearPrefix = new Date().getFullYear().toString().slice(0, 2); 
    const fullYear = parseInt(yearPrefix + year, 10); 
    const expiry = new Date(Date.UTC(fullYear, month - 1, 1));
    const today = new Date();
    const expired = expiry < new Date(today.getFullYear(), today.getMonth(), 1);
    const validCard = await ok.validateCard(number);

    if (!validCard) {
      setNotification ('Card number is invalid 😅');
      markAsWrong('number');
      return false;
    } else if(!number) {
      setNotification ('Card number is missing 😅');
      markAsWrong('number');
      return false;
    } else if(19>number.toString().length) {
      setNotification ('Payment card number is too short');
      markAsWrong('number');
      return false;
    } else if(!month) {
      setNotification ('Expiry month is missing 😅');
      markAsWrong('month');
      return false;
    } else if(12<month) {
      setNotification ('Expiry month is set to '+month+' and it should be between 1 and 12 😅');
      markAsWrong('month');
      return false;
    } else if(!year) {
      setNotification ('Expiry year is missing 😅');
      markAsWrong('year');
      return false;
    } else if(expired) {
      setNotification ('Card is expired 😅');
      markAsWrong('month');
      markAsWrong('year');
      return false;
    } else if(!cvc) {
      setNotification ('CVC is missing 😅 It can be found on the back of the card');
      markAsWrong('cvc');
      return false;
    } else if(3>cvc.toString().length) {      
      setNotification ('CVC is too short 😅');
      markAsWrong('cvc');
      return false;
    } else {
      return true;
    }
  }

  const saveCard = async (user: user, number: number, month: number, year: number, cvc: number) => {
    loading.value=true;
    const card = { number, month, year, cvc } as card;
    await removeMarkedAsWrong();
    await setNotification('');
    const valid = await validateCard(number, month, year, cvc);
    if(valid) {
      const token = await generateStripeToken(user, card);
      if(!token) {
        return;
      } else {
        encryptAndStoreCard(user, card, token);
      }
    }
    loading.value, editing.value=false
    return
  }
</script>
<style scoped lang="scss">
  
  .card{
    padding: sizer(1) sizer(2);
    margin: 0 0 sizer(1) 0;
    max-height: sizer(4);
    max-width: 100%;
    display:grid;
    grid-template-columns: sizer(4) 1fr sizer(3);
    gap: sizer(2);
    overflow:hidden;
    @include border;
    @include hoverable;
  }
  .card.editing{
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
    background-image: url('/media/icons/mastercard.svg');
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
  .card.editing .details{
    grid-template-columns: sizer(17) sizer(4) sizer(4) sizer(4);
  }
  .card .edit{
    height: sizer(4);
    line-height: sizer(4);
    float:right;
    text-align:right;
  }
  input{
    font-size:85%;
  }
  input#year,
  input#month,
  input#cvc{
    padding-left:0;
    padding-right:0;
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
    background-color: red(20%);
    transition:background-color 0.2s $easing-in;
  }
</style>