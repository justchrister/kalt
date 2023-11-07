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
      <div class="currency">{{ user.currency }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const state = ref('loading')
const supabase = useSupabaseClient()
const userId = useSupabaseUser()
  const props = defineProps({
    uuid: {
      type: String,
      required: true
    }
  })
  const user = await get(supabase).user(userId.value.id)
  
  const amount = ref(10);
  let initialAmount = props.amount;
  let previousValue;
  const updatePaymentAmount = async () => { 
    if(initialAmount==ok.toInt(amount.value)) return
    if(previousValue==ok.toInt(amount.value)) return
    previousValue = ok.toInt(amount.value)
    if(amount.value){
      const { error } = await pub(supabase, {
        sender:'components/input/amountBuy.vue',
        entity: props.uuid,
      }).accountTransactions({
        userId: user.userId,
        amount: ok.toInt(amount.value),
        currency: user.currency,
        type: 'deposit',
        subType: 'card',
        status: 'incomplete',
        autoVest: 1
      });
      if(error) ok.log('error', 'could not update amount', error)
      if(!error) ok.log('success', 'updated amount')
    }
  }

  const options = {
    preProcess: val => val.replace(/[$,]/g, ''),
    postProcess: val => {
      if (!val) return ''
      const sub = 3 - (val.includes('.') ? val.length - val.indexOf('.') : 0)
      return Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: user.currency
      }).format(val)
        .slice(0, sub ? -sub : undefined)
    }
  }
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
    border-left:$border;
    text-align:center;
  }
  input{
    border:none;
  }/*
  .dark-mode{
    .input-group,
    input{
      border-color:$light;
    }
  }*/
</style>