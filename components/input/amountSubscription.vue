<template>
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
        @input="updatePaymentAmount"
      />
      <div class="currency">{{ currency }}</div>
    </div>
  </div>
</template>

<script setup>
  const state = ref('loading')
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const props = defineProps({
    amount: {
      type: Number,
      required: false
    }
  })
  
  const getCurrency = async () => {
    const { data } = await supabase
      .from('getUser')
      .select('currency')
      .limit(1)
      .single()
    return data.currency
  }
  const amount =  ref(props.amount)
  const currency = await getCurrency()
  let initialAmount = props.amount
  let previousValue;
  const updatePaymentAmount = async () => { 
    if(initialAmount==ok.toInt(amount.value)) return
    if(previousValue==ok.toInt(amount.value)) return
    ok.log('', previousValue)
    previousValue = ok.toInt(amount.value)
    ok.log('', previousValue)
    const { error } = await supabase
      .from('userSubscriptions')
      .insert({
        message_entity:user.value.id,
        userId:user.value.id,
        message_sender: 'components/input/amountSubscription.vue',
        amount: ok.toInt(amount.value)
    })
    if(error) ok.log('error', 'could not update amount', error)
    if(!error) ok.log('success', 'updated amount 🥰')
    initialAmount = null;
  }
  const options = {
    preProcess: val => val.replace(/[$,]/g, ''),
    postProcess: val => {
      if (!val) return ''
      const sub = 3 - (val.includes('.') ? val.length - val.indexOf('.') : 0)
      return Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
      }).format(val)
        .slice(0, sub ? -sub : undefined)
    }
  }
  state.value = ''


</script>

<style scoped lang="scss">
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
    text-align:center;
  }
  input{
    border:none;
    border-right:$border;
  }
/*
  .dark-mode{
    .input-group,
    input{
      border-color:$light;
    }
  }*/
</style>