<template>
  <div class="transaction">
    <div class="transaction-type" :id="props.type">
    </div>
    <div class="amount">
      {{ok.prettyCurrency(props.amount, props.currency)}}
    </div>
    <div class="date">
      {{ok.prettyDate(props.date)}}
    </div>
    <div class="time">
      {{ok.prettyTime(props.date)}}
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    type: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    date: {
      type: String, 
      required: true
    },
    currency:{
      type: String, 
      required: true
    }
  })


</script>
<style scoped lang="scss">
.transaction {
  display: grid; 
  grid-template-columns: $clamp-2 12fr 2fr 2fr; 
  gap: $clamp;
  border-bottom:$border;
}
.transaction-type{
  background-size:$clamp-1;
  background-repeat:no-repeat;
  background-position:center;
  width:$clamp-2;
  height:$clamp-2;
}
#withdraw{
  background-image:url('/omoji/withdraw.svg');
}
#deposit{
  background-image:url('/omoji/deposit.svg');
}
</style>