<template>
  <div class="fund" v-if="fund" @click="adjustrate()">
    <div class="icon">
      <span :style="{ 'background-image': `url('/icons/funds/${props.ticker}.svg')` }"></span>
    </div>
    <div class="name">
      {{fund.name}}
      <span class="beta" v-if="props.beta">BETA</span>
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
  const user = await get(supabase).user(auth.value);
  const props = defineProps({
    ticker: {
      type: String,
      required: true
    }, 
    beta: {
      type: Boolean,
      required: false,
      default: false
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
  const logHearts = async () => {
    if(rate.value===3){
      if(props.ticker.length==3){
        ok.log('', props.ticker+'       ♥ ♥ ♥')
      } else {
        ok.log('', props.ticker+'        ♥ ♥ ♥')
      }
    } 
    if(rate.value===2) {
      if(props.ticker.length==3){
        ok.log('', props.ticker+'       ♥ ♥')
      } else {
        ok.log('', props.ticker+'        ♥ ♥')
      }
    }
    if(rate.value===1) {
      if(props.ticker.length==3){
        ok.log('', props.ticker+'       ♥')
      } else {
        ok.log('', props.ticker+'        ♥')
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
      id: user.id
    }).userDefinedFunds({
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
  .name::selection,
  .name .beta::selection{
    background-color:transparent;
  }
  .name .beta{
    font-size:55%;
    line-height: 140%;
    font-weight:bold;
    color: primary(90%);
    padding: sizer(0.1) sizer(0.35);
    display:inline-block;
    @include border;
    @include hoverable;
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