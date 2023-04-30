<template>
  <div class="blkkk">
    <label>Select quantity: </label>
    <div class="wrapper">
      <span>{{val}}</span>
      <span @click="remove()">-</span>
      <span @click="add()">+</span>
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
    const { error } = await supabase
      .from('exchange_orders')
      .insert({
        message_entity_id: props.uuid,
        quantity: val.value,
        message_sender: 'components/input/amountSell.vue'
    })
    if(error) ok.log('error', 'could not update quantity', error)
    if(!error) ok.log('success', 'updated quantity')
  }
  const getMax = async () => {
    const { data, error } = await supabase
      .from('get_user_portfolio')
      .select('quantity_today')
      .order('date', { ascending: false })
      .limit(1)
      .single()
    return data.quantity_today
  }
  const max = await getMax();
  const val = ref(0)
  const add = async () => { 
    if(val.value>=max){
      val.value=max
    } else {
      val.value+=1
      await updateSellOrder();
    }
  }
  const remove = async () => {
    if(val.value<=0){
      val.value=0
    } else {
      val.value-=1
      await updateSellOrder();
    }
  }
</script>
<style scoped lang="scss">
  label{
    display:block;
  }
  .wrapper{
    display:grid;
    grid-template-columns: 1fr $clamp-5 $clamp-5;
    border:$border;   
    user-select: none;
  }
  span{
    display:inline-block;
    border:none;
    border-left:$border;
    padding:$clamp-1 0;
    min-width:$clamp-4;
    box-sizing: border-box;
    user-select: none;
    height:100%;
    text-align:center;
    &:hover{
      cursor: pointer;
      background:white;
    }
    &:first-child{
      border-left:none;
      text-align: left;
      padding-left: $clamp-2;
    }
  }
  button:hover,
  button:active,
  button:focus{
    border-radius:0;
  }
  .blkkk{
    margin-top:$clamp;
  }
</style>