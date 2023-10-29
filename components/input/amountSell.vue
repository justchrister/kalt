<template>
  <div>
    <div class="input-wrap">
      <label for="amount"> 
        Select amount: 
      </label>
      <div class="input-group">
        <input
          v-maska:[options]
          data-maska="0.99"
          data-maska-tokens="0:\d:multiple|9:\d:optional"
          type="text"
          placeholder="Amount"
          id="amount"
          class="amount"
          v-model="amount"
          @input="updateSellOrder"
        />
        <div class="currency">{{ currency }}</div>
      </div>
      <div class="pills">
        set to: <pill text="account balance" @click="setToAccountBalance()"/>
        <pill text="portfolio value" @click="setToPortfolioValue()"/>
        
      </div>
    </div>
    <info-box type="info" :text="'You only have '+max+' available for withdrawal' " v-if="notify"/>
    <info-box type="warning" :text="'If you withdraw more than your account balance of '+account+' it will trigger an automatic sale of shares' " v-if="notify2"/>
    
  </div>
</template>

<script setup>
const notify = ref(false)
const notify2 = ref(false)
const supabase = useSupabaseClient()
const amount = ref(0);
const userId = useSupabaseUser()
  const props = defineProps({
    uuid: {
      type: String,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    portfolio: {
      type: Number,
      required: true
    },
    account: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      required: true
    }
  })


  const updateSellOrder = async () => {
    const amountFloat = ok.toFloat(amount.value)
    if(amountFloat>props.max){
      notify.value = true
    } else {
      notify.value = false
    }
    if(amountFloat>props.account){
      notify2.value = true
    } else {
      notify2.value = false
    }
    if(amountFloat>0){
    ok.log('', amountFloat)
      const { error, data } = await pub(supabase, {
        sender:'components/input/amountSell.vue',
        entity: props.uuid
      }).accountTransactions({
        userId: userId.value.id,
        amount: -amountFloat,
        status: 'incomplete',
        type: 'withdraw'
      });
      if(error) ok.log('error', 'could not update quantity', error)
      if(!error) ok.log('success', 'updated quantity')
    } else{
      return false
    }
  }

  const options = {
    preProcess: val => val.replace(/[$,]/g, ''),
    postProcess: val => {
      if (!val) return ''
      const sub = 3 - (val.includes('.') ? val.length - val.indexOf('.') : 0)
      return Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: props.currency
      }).format(val)
        .slice(0, sub ? -sub : undefined)
    }
  }
  const setToAccountBalance = async () => {
    amount.value = props.account
  }
  const setToPortfolioValue = async () => {
    amount.value = props.portfolio
  }
</script>
<style scoped lang="scss">
  label{
    display:block;
  }
  .input-group{
    border:$border;
    display: grid;
    grid-template-rows: 1fr;
    gap: 0% 0%;
    grid-auto-flow: row;
    grid-template-columns: 6fr 1fr;
  }
  .currency{
    height:$clamp-4;
    line-height:$clamp-4;
    border-left:$border;
    text-align:center;
  }
  input{
    border:none;
  }
  .pills{
    margin-top:$clamp-0-5;
  }
</style>