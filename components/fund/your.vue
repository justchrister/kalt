<template>
  <div class="fund" v-if="fund" @click="adjustrate()">
    <div class="icon">
      <span :style="{ 'background-image': `url('/media/icons/funds/${shortTicker}.svg')` }"></span>
    </div>
    <div class="name">
      {{fund.name}}
    </div>
    <div class="rate">
      <span :class="{ active: rate >= 1}"></span>
      <span :class="{ active: rate >= 2}"></span>
      <span :class="{ active: rate >= 3}"></span>
    </div>
  </div>
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
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
  const state = await get(supabase).userDefinedFunds(auth.value.id, props.ticker);
  const shortTicker = props.ticker.split('.')[0] 
  const logHearts = async () => {
    if(rate.value===3){
      if(shortTicker.length==3){
        ok.log('', shortTicker+'       ♥ ♥ ♥')
      } else {
        ok.log('', shortTicker+'        ♥ ♥ ♥')
      }
    } 
    if(rate.value===2) {
      if(shortTicker.length==3){
        ok.log('', shortTicker+'       ♥ ♥')
      } else {
        ok.log('', shortTicker+'        ♥ ♥')
      }
    }
    if(rate.value===1) {
      if(shortTicker.length==3){
        ok.log('', shortTicker+'       ♥')
      } else {
        ok.log('', shortTicker+'        ♥')
      }
    }
  }
  if(state && state.rate){
    rate.value = state.rate
    logHearts()
  }
  const adjustrate = async () => {
    if(rate.value===3){
      rate.value = 0
    } else {
      rate.value = rate.value + 1
    }
    logHearts()
    const { } = await pub(supabase, {
      sender:'components/fund/your.vue',
      entity: auth.value.id
    }).userDefinedFunds({
      'userId': auth.value.id,
      'ticker': props.ticker,
      'rate': rate.value
    });
  }
</script>
<style scoped lang="scss">
  
  .fund{
    display:grid;
    grid-template-columns: sizer(3) 1fr sizer(5);
    padding: sizer(1) sizer(1) sizer(1) sizer(1.5);
    line-height: sizer(4);
    margin-bottom: sizer(1);
    @include border;
    @include hoverable;
  }
  .fund:hover{
    @include hovering;
    cursor:pointer;
  }
  .icon span{
    height: sizer(4);
    width: sizer(2);
    display:block; 
    background-repeat: no-repeat;
    background-position: center;
    background-size:contain;
  }
  .rate span{
    opacity:0.99;
    width: sizer(1.45);
    height: sizer(1);
    display:inline-block;
    background:url('/omoji/heart-outline.png') no-repeat center center;
    background-size:contain;
  }
  .rate span.active{
    background:url('/omoji/heart-filled.png') no-repeat center center;
    background-size:contain;
    animation: hearbeat 2s $easing-in-out 1;
  }
  .name::selection{
    background-color:transparent;
  }
  @keyframes hearbeat {
    0%, 5%, 10%, 20%, 100% { 
      transform: scale(1); 
    }
    5%, 15% { 
      transform: scale(1.15);  
    }
  }
</style>