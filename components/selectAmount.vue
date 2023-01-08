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
      @input="updatePayment"
    />
  </div>
    <div class="element select preferred_currency">
      <label for="preferred_currency"> 
      </label>
      <select v-model="preferred_currency" :class="state" 
      @change="updatePayment">
        <option v-for="currency of currencies" :value="currency.iso" :key="currency.iso">{{currency.name}}</option>
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
    }
  })

  const { data } = await supabase
    .from('accounts')
    .select('preferred_currency')
    .single()
  
  const preferred_currency = ref(data.preferred_currency)
  const amount =  ref('')
  
  const { data: currencies } = await supabase
    .from('currencies')
    .select('iso, name')
    .eq('available', true)

  state.value = ''

  const updatePayment = async () => { 
    const { error } = await supabase
      .from('payments')
      .update({
        pay_id: props.uuid,
        amount: amount.value,
      })
      console.log(error)
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