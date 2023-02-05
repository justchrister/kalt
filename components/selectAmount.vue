<template>
  <div class="component select amount">
  <div class="element input text">
    <label for="amount"> 
      Amount: 
    </label>
    <input
      type="text"
      placeholder="Amount"
      id="amount"
      class="atom amount"
      v-model="amount"
      @input="updatePaymentAmount"
    />
  </div>
    <div class="element select preferred_currency">
      <label for="preferred_currency"> 
      </label>
      <select v-model="preferred_currency" :class="state" 
      @change="updatePaymentCurrency">
        <option v-for="currency of currencies" :value="currency.iso" :key="currency.iso">{{currency.iso}}</option>
      </select>
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
    type: {
      type: String, 
      required: true
    }
  })
  
  const preferred_currency = ref()

  if(type){
    oklog("", "modifying subscription: ")
  }
  if(type="buy"){
    const updatePaymentAmount = async () => { 
      if(amount.value){
        const { error } = await supabase
          .from('transactions')
          .update({
            transaction_id: props.uuid,
            amount: amount.value
        })
        if(error) oklog('error', 'could not update amount')
        if(!error) oklog('success', 'updated amount')
      }
    }
    const updatePaymentCurrency = async () => {
        const { error } = await supabase
          .from('transactions')
          .update({
            transaction_id: props.uuid,
            currency: preferred_currency.value
        })
        if(error) oklog('error', 'could not update currency')
        if(!error) oklog('success', 'updated currency to: '+preferred_currency.value)
    }


    const { data } = await supabase
      .from('accounts')
      .select('preferred_currency')
      .single()


    if (data) {
      oklog('success', 'found preferred currency: ' + data.preferred_currency)
      preferred_currency.value = data.preferred_currency
      updatePaymentCurrency()
      oklog('success', 'set buy currency: ' + preferred_currency.value)
    }
    const amount =  ref('')
    
    const { data: currencies } = await supabase
      .from('currencies')
      .select('iso, name')
      .eq('available', true)

    state.value = ''
  }


</script>
<style scoped>
.element.select.preferred_currency,
.element.input.text{
  display:inline-block;
}
.element.input.text{
  width: 80%;
}
.element.input.text input {
  border-right: transparent 0px solid;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.element.select.preferred_currency{
  width: 20%;
}
.element.select.preferred_currency select {
  border-left: transparent 0px solid;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>