<template>
  <div class="fund" v-if="fund">
    <div class="icon">
      <span :style="{ 'background-image': `url('/media/icons/funds/${shortTicker}.svg')` }"></span>
    </div>
    <div class="name">
      {{fund.name}}
    </div>
    <div class="rate" @click="adjustrate()">
      <span :class="{ active: rate >= 1}"></span>
      <span :class="{ active: rate >= 2}"></span>
      <span :class="{ active: rate >= 3}"></span>
    </div>
  </div>
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const props = defineProps({
    ticker: {
      type: String,
      required: true
    }
  })
  const { data:fund, error } = await supabase
    .from('sys_funds')
    .select()
    .eq('ticker', props.ticker)
    .limit(1)
    .single()
  const rate = ref(0)
  const state = await get(supabase).userDefinedFunds(user.value.id, props.ticker);
  const shortTicker = props.ticker.split('.')[0] 
  const logHearts = async () => {
    if(rate.value===3){
        ok.log('', shortTicker+' ♥ ♥ ♥')
    } 
    if(rate.value===2) {
      ok.log('', shortTicker+' ♥ ♥')
    }
    if(rate.value===1) {
      ok.log('', shortTicker+' ♥')
    }
  }
  if(state){
    rate.value = state.rate
    logHearts()
  }
  const adjustrate = async () => {
    if(rate.value===3){
      rate.value = 0
    } else {
      rate.value= rate.value + 1
    }
    logHearts()
    const { } = await pub(supabase, {
      sender:'components/fund/your.vue',
      entity: user.value.id
    }).userDefinedFunds({
      'userId': user.value.id,
      'ticker': props.ticker,
      'rate': rate.value
    });
  }
</script>
<style scoped lang="scss">
  
  .fund{
    display:grid;
    grid-template-columns: $clamp-3 1fr $clamp-5;
    border:$border;
    padding:$clamp-1 $clamp-1 $clamp-1 $clamp-1-5;
    line-height:$clamp-4;
    margin-bottom:$clamp-1;
  }
  .icon span{
    height:$clamp-4;
    width:$clamp-2;
    display:block; 
    background-repeat: no-repeat;
    background-position: center;
    background-size:contain;
  }
  .rate span{
    width:$clamp-1;
    height:$clamp-1;
    margin-right:$clamp-0-5;
    display:inline-block;
    background:url('/omoji/heart-outline.svg') no-repeat center center;
    background-size:contain;
    &:hover{
      cursor:pointer;
    }
  }
  .rate span.active{
    background:url('/omoji/heart-filled.svg') no-repeat center center;
    background-size:contain;
  }
</style>