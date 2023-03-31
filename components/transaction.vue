<template>
  <div class="transaction">
    <div class="transation-type">
      <omoji emoji="→" v-if="props.type===deposit"/>
      <omoji emoji="←" v-if="props.type===withdraw"/>
      <omoji emoji="↗" v-if="props.type===dividend"/>
    </div>
    <div class="amount">
      {{prettyCurrency(props.amount, props.currency)}}
    </div>
    <div class="date">
      {{prettyDate(props.dateTime)}}
    </div>
    <div class="time">
      {{prettyTime(props.dateTime)}}
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
    dateTime: {
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

  function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }

  const prettyCurrency = (amount, currency) =>{
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 3,
    });
    return formatter.format(amount)
  }
  const prettyDate = (dateTime) => {
    const day = new Date(dateTime).getDate()
    const month = new Date(dateTime).getMonth()+1
    const year = new Date(dateTime).getFullYear()
    return day+"/"+month+"/"+year
  }
  const prettyTime = (dateTime) => {
    const hour = addZero(new Date(dateTime).getHours())
    const minute = addZero(new Date(dateTime).getMinutes())
    return hour+":"+minute
  }
</script>
<style scoped lang="scss">
.transaction {
  display: grid; 
  grid-template-columns: $clamp 12fr 2fr 2fr; 
  gap: 2% 2%; 
  border-bottom:$border;
}
</style>