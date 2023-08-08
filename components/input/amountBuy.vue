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

<script setup lang="ts">
const state = ref('loading')
const supabase = useSupabaseClient()
const user = useSupabaseUser()
  const props = defineProps({
    uuid: {
      type: String,
      required: true
    }
  })
  const getPreferredCurrency = async () => {
    const { data, error } = await supabase
      .from('getUser')
      .select('currency')
      .eq('userId', user.value.id)
      .limit(1)
      .single()
    return data.currency
  }

  const currency = await getPreferredCurrency();
  const amount = ref(10);
  const updatePaymentAmount = async () => { 
    if(amount.value){
      const { error } = await pub(supabase, {
        sender:'components/input/amountBuy.vue',
        entity: props.uuid,
      }).accountTransactions({
        userId: user.value.id,
        amount: ok.toInt(amount.value),
        currency: currency,
        type: 'deposit',
        subType: 'card',
        status: 'incomplete',
        autoInvest: 1
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
        currency: currency
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
    text-align:center;
  }
  input{
    border:none;
    border-right:$border;
  }/*
  .dark-mode{
    .input-group,
    input{
      border-color:$light;
    }
  }*/
</style>