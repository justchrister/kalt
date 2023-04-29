<template>
  <div class="input-wrap">
    <label for="quantity"> 
      Select quantity: 
    </label>
    <div class="input-group">
      <input
        type="text"
        placeholder="Quantity"
        id="quantity"
        v-maska data-maska="##.##"
        class="quantity"
        v-model="quantity"
        @input="updatePaymentAmount"
      />
      <div class="ticker">ddf.gi</div>
    </div>
  </div>
</template>

<script setup>
const state = ref('loading')
const supabase = useSupabaseClient()
const user = useSupabaseUser()
  const props = defineProps({
    uuid: {
      type: String,
      required: true
    }
  })
  

  const updateSellOrder = async () => { 
    if(quantity.value){
      const { error } = await supabase
        .from('exchange_orders')
        .insert({
          message_entity_id: props.uuid,
          message_sender: 'components/input/quantityOneTime.vue',
      })
      if(error) ok.log('error', 'could not update quantity', error)
      if(!error) ok.log('success', 'updated quantity')
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
  .ticker{
    height:$clamp-4;
    line-height:$clamp-4;
    text-align:center;
  }
  input{
    border:none;
    border-right:$border;
  }
</style>