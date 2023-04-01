<template>
  <div class="component select amount">
    <div class="element input text">
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
          class="atom amount"
          v-model="amount"
          @input="updatePaymentAmount"
        />
        <select v-model="currency" :class="state" 
        @change="updatePaymentCurrency">
          <option v-for="currency of currencies" :value="currency.iso" :key="currency.iso">{{currency.iso}}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
  const state = ref('loading')
  const supabase = useSupabaseClient()

  const props = defineProps({
    uuid: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: false
    },
    currency: {
      type: String,
      required: false
    }
  })
  
  const amount =  ref('')
  const currency =  ref('')
  if(props.amount) amount.value = props.amount
  if(props.currency){
    currency.value = props.currency
  } else {
    const { data } = await supabase
      .from('profiles')
      .select('preferred_currency')
      .single()
    if (data) {
      currency.value = data.preferred_currency
      updatePaymentCurrency()
    }
  }
  const { data: currencies } = await supabase
    .from('currencies')
    .select('iso, name')
    .eq('available', true)

  const updatePaymentAmount = async () => { 
    if(amount.value){
      const { error } = await supabase
        .from('subscriptions')
        .update({
          subscription_id: props.uuid,
          amount: ok.toInt(amount.value)
      })
      if(error) ok.log('error', 'could not update amount')
      if(error) ok.log('error', error.message)
      if(!error) ok.log('success', 'updated amount')
    }
  }
  const updatePaymentCurrency = async () => {
      const { error } = await supabase
        .from('subscriptions')
        .update({
          subscription_id: props.uuid,
          currency: currency.value
      })
      if(error) ok.log('error', 'could not update currency')
      if(!error) ok.log('success', 'updated currency to: '+currency.value)
  }

  const options = {
    preProcess: val => val.replace(/[$,]/g, ''),
    postProcess: val => {
      if (!val) return ''

      const sub = 3 - (val.includes('.') ? val.length - val.indexOf('.') : 0)

      return Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency.value
      }).format(val)
        .slice(0, sub ? -sub : undefined)
    }
  }
  state.value = ''


</script>

<style scoped lang="scss">
  .component.select.amount .input-group{
    display: grid;
    grid-template-rows: 1fr;
    gap: 0% 0%;
    grid-auto-flow: row;
    grid-template-columns: 6fr 1fr;
    .amount{
      border-right-color:transparent;
    }
  }
</style>