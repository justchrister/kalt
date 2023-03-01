<template>
  <div class="component select amount">
    <div class="element input text">
      <label for="amount"> 
        Select amount: 
      </label>
      <div class="input-group">
        <input
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
      .from('accounts')
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
            amount: amount.value
        })
        if(error) oklog('error', 'could not update amount')
        if(!error) oklog('success', 'updated amount')
      }
    }
    const updatePaymentCurrency = async () => {
        const { error } = await supabase
          .from('subscriptions')
          .update({
            subscription_id: props.uuid,
            currency: currency.value
        })
        if(error) oklog('error', 'could not update currency')
        if(!error) oklog('success', 'updated currency to: '+currency.value)
    }


    state.value = ''


</script>