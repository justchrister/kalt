<template>
  <main>
    <block margin="2">
      <progress-bar :percentage="percentage+'%'" />
    </block>
    <block>
      <p>
        How much do you make a year?
      </p>
      <form @submit.prevent="save()">
        <input type="radio" id="underThirtyFive" name="sourceOfFunds" value="underThirtyFive" v-model="sourceOfFunds" @click="save(null, 30000)">
        <label class="radioRow" for="underThirtyFive">
          <span> Under 
            <span v-if="user.currency==='NOK'">
              {{alternativeValues.underThirtyFive}} {{ user.currency }}
            </span>
            <span v-else>
              35 000 {{ user.currency }}
            </span>
          </span>
        </label>
        <input type="radio" id="thirtyFiveToFifty" name="sourceOfFunds" value="thirtyFiveToFifty" v-model="sourceOfFunds" @click="save(35000, 50000)">
        <label class="radioRow" for="thirtyFiveToFifty">
          <span class="incomeRange">
            <span v-if="user.currency==='NOK'">
              {{alternativeValues.thirtyFiveToFifty[0]}} {{ user.currency }}
            </span>
            <span v-else>
              35 000 {{ user.currency }}
            </span>
            <span> - </span>
            <span v-if="user.currency==='NOK'">
              {{alternativeValues.thirtyFiveToFifty[1]}} {{ user.currency }}
            </span>
            <span v-else>
              50 000 {{ user.currency }}
            </span>
          </span>
        </label>
        <input type="radio" id="fiftyToSeventy" name="sourceOfFunds" value="fiftyToSeventy" v-model="sourceOfFunds" @click="save(50000, 70000)">
        <label class="radioRow" for="fiftyToSeventy">
          <span class="incomeRange">
            <span v-if="user.currency==='NOK'">
              {{alternativeValues.fiftyToSeventy[0]}} {{ user.currency }}
            </span>
            <span v-else>
              50 000 {{ user.currency }}
            </span>
            <span> - </span>
            <span v-if="user.currency==='NOK'">
              {{alternativeValues.fiftyToSeventy[1]}} {{ user.currency }}
            </span>
            <span v-else>
              70 000 {{ user.currency }}
            </span>
          </span>
        </label>
        <input type="radio" id="seventyToHundred" name="sourceOfFunds" value="seventyToHundred" v-model="sourceOfFunds" @click="save(70000, 100000)">
        <label class="radioRow" for="seventyToHundred">
          <span class="incomeRange">
            
            <span v-if="user.currency==='NOK'">
              {{alternativeValues.seventyToHundred[0]}} {{ user.currency }}
            </span>
            <span v-else>
              70 000 {{ user.currency }}
            </span>
            <span> - </span>
            <span v-if="user.currency==='NOK'">
              {{alternativeValues.seventyToHundred[1]}} {{ user.currency }}
            </span>
            <span v-else>
              100 000 {{ user.currency }}
            </span>
          </span>
        </label>
        <input type="radio" id="overHundred" name="sourceOfFunds" value="overHundred" v-model="sourceOfFunds" @click="save(100000, null)">
        <label class="radioRow" for="overHundred">
          <span> Over 
            <span v-if="user.currency==='NOK'">
              {{alternativeValues.overHundred}} {{ user.currency }}
            </span>
            <span v-else>
              100 000 {{ user.currency }}
            </span>
          </span>
        </label>
        <input-button link="/profile" v-if="accepted">complete -> </input-button>
      </form>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Source of funds',
    middleware: 'auth'
  })
  useSeoMeta({
    title: 'KYC',
    ogTitle: 'Kalt - KYC',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta.png'
  })
  const sourceOfFunds = ref('');
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value);
  const percentage = ref(70)
  const accepted = ref(false)

  const save = async (from: any, to: any) => {
    if(user.id === undefined) return;
    let rangeFrom = from;
    let rangeTo = to;
    if(user.currency === 'NOK' || user.currency==='DKK' || user.currency==='SEK'){
      if(rangeFrom) rangeFrom = from * 10;
      if(rangeFrom) rangeTo = to * 10;
    }
    percentage.value = 75;
    const error = await pub(supabase, {
      id: user.id,
      sender:'pages/profile/kyc/1.vue'
    }).kyc({
      'incomeRangeFrom': rangeFrom,
      'incomeRangeTo': rangeTo,
      'incomeRangeCurrency': user.currency,
    });
    if(!error) accepted.value = true;
    
  }
  const alternativeValues = {
    underThirtyFive: '350 00',
    thirtyFiveToFifty: [
      '350 000',
      '500 000'
    ],
    fiftyToSeventy: [
      '500 000',
      '700 000'
    ],
    seventyToHundred: [
      '700 000',
      '1 000 000'
    ],
    overHundred: '1 000 000'
  }
</script>
<style scoped lang="scss">
  
  input[type="radio"] {
      height: sizer(1);
      appearance: radio;
      border: 1px solid #ccc;
      margin-right: sizer(1);
      vertical-align: middle;
      margin:sizer(1);
      opacity:0;
      display:none;
  }
  label{
    margin:0;
    line-height:sizer(3);
    &:hover{
      cursor:pointer;
    }
  }
  .radioRow {
    margin-bottom: sizer(1);
    display: grid;
    grid-template-columns: 1fr sizer(3);
    @include border;
    @include hoverable;
    padding: sizer(1) sizer(2) sizer(1) sizer(1.5);
    &:hover{
      cursor:pointer;
      @include hovering;
    }
  }
  // if input radio is selected give .radioRow a selected class
  input[type="radio"]:checked + label {
    @include selected;
  }
  .incomeRange{
    display:grid;
    grid-template-columns: sizer(9) sizer(1.1) sizer(10);
  }
</style>