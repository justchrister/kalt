<template>
  <div class="transaction" v-if="props.currency">
    <div class="transaction-type">
      {{ type }}
    </div>
    <div class="amount">
      {{props.currency}}
      {{ok.prettyCurrency(props.amount)}}
    </div>
    <div class="date">
        {{ok.prettyDate(props.date)}} at
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
  const type = ref('←')
  if(props.type==='deposit'){
    type.value = '→'
  }

</script>
<style scoped lang="scss">
  .transaction {
    display: grid; 
    grid-template-columns: $clamp 1fr 1fr $clamp-4; 
    gap: $clamp;
    border-bottom:$border;
    *{
      font-family:$monospace;
      font-size:85%;
    }
  }

  .date, .time{
    text-align:right;
  }
  .date span{
    padding-right:$clamp-2;
    border-right:$border;
  }
  .dark-mode .transaction{
    border-color:$light;
  }
</style>