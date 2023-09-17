<template>
  <div class="fund" v-if="data">
    <div class="icon">
      <span id="art">
      </span>
    </div>
    <div class="name">
      {{data.name}}
    </div>
    <div class="amount" @click="adjustAmount()">
      <span :class="{ active: amount >= 1}"></span>
      <span :class="{ active: amount >= 2}"></span>
      <span :class="{ active: amount >= 3}"></span>
    </div>
  </div>
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const props = defineProps({
    ticker: {
      type: String,
      required: true
    }
  })
  const { data, error } = await supabase
    .from('sys_funds')
    .select()
    .eq('ticker', props.ticker)
    .limit(1)
    .single()
  ok.log('', data)
  const amount = ref(0)

  const adjustAmount = () => {
    if(amount.value===3){
      amount.value = 0
    } else {
      amount.value=+1
    }
  }
</script>
<style scoped lang="scss">
  
  .fund{
    display:grid;
    grid-template-columns: $clamp-4 1fr $clamp-5;
    border:$border;
    padding:$clamp-1;
    line-height:$clamp-4;
    margin-bottom:$clamp-1;
  }
  .icon{
    #art{
      height:$clamp-4;
      width:$clamp-3;
      display:block; 
      background:url('/media/icons/funds/art.svg') no-repeat center center;
      background-size:contain;
    }
  }
  .amount span{
    width:$clamp-1;
    height:$clamp-1;
    margin-right:$clamp-0-5;
    display:inline-block;
    background:url('/omoji/heart-outline.svg') no-repeat center center;
    background-size:contain;
  }
  .amount span.active{
    background:url('/omoji/heart-filled.svg') no-repeat center center;
    background-size:contain;
  }
</style>