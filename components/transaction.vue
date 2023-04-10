<template>
  <div class="transaction">
    <div class="transation-type">
      <omoji emoji="→" v-if="props.type===deposit"/>
      <omoji emoji="←" v-if="props.type===withdraw"/>
      <omoji emoji="↗" v-if="props.type===dividend"/>
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
<script setup lang="ts">
  const props = defineProps({
    type: {
      type: Number,
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
  const deposit = 0;
  const withdraw = 1;
  const dividend = 2;


</script>
<style scoped lang="scss">
.transaction {
  display: grid; 
  grid-template-columns: $clamp 12fr 2fr 2fr; 
  gap: 2% 2%; 
  border-bottom:$border;
}
</style>