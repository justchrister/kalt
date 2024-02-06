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
        :class="state"
        v-model="amount"
        @input="updatePaymentAmount"
      />
      <div class="currency">
        {{ currency }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const state = ref('loading')
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value)

  const props = defineProps({
    initialAmount: {
      type: Number,
      required: false
    },
    type: {
      type: String,
      required: true
    }, 
    uuid: {
      type: String,
      required: false
    }
  })
  const amount =  ref(props.initialAmount || '')
  const currency = ref(user.currency || 'EUR')

  let initialAmount = amount.value
  let previousValue;
  const updatePaymentAmount = async () => { 
    if(initialAmount==ok.toInt(amount.value) || previousValue==ok.toInt(amount.value) ) {
      return
    };
    state.value = 'loading'
    previousValue = ok.toInt(amount.value)
    if(props.type==="autoInvest"){
      const error = await pub(supabase, {
        sender:'components/input/invest.vue',
        id: user.id
      }).autoInvest({
        amount: ok.toInt(amount.value)
      });
      if(error) {
        ok.log('error', 'could not update amount: '+error.message)
        state.value = 'error'
      } else {
        await ok.sleep(200)
        state.value = 'success'
      }
    } else if(props.type==="once"){
      if(!props.uuid) ok.log('error', 'missing uuid')

      const error = await pub(supabase, {
        sender:'components/input/invest.vue',
        id: props.uuid,
      }).transactions({
        userId: user.id,
        amount: ok.toInt(amount.value),
        currency: currency.value,
        type: 'deposit',
        subType: 'card',
        status: 'incomplete',
        autoVest: 1
      });
      if(error) {
        ok.log('error', 'could not update amount: '+error.message)
      }
      if(!error) {
        ok.log('', 'updated amount')
        state.value = 'success'
      }
    }
    initialAmount = null;
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
  .input-group{
    display: grid;
    grid-template-rows: 1fr;
    gap: 0% 0%;
    grid-auto-flow: row;
    grid-template-columns: 6fr 1fr;
    @include border;
    @include hoverable;
    &:hover{
      @include hovering;
    }
  }
  .currency{
    height: sizer(4);
    line-height: sizer(4);
    text-align:center;
    border-left: $border;
  }
  input{
    border:none;
  }
</style>