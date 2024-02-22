<template>
    <div class="fund" v-if="fund" @click="navigateTo(`/funds/${shortTicker}`)">
      <div class="icon">
        <span :style="{ 'background-image': `url('/icons/funds/${shortTicker}.svg')` }"></span>
      </div>
      <div class="name">
        {{fund.name}}
      </div>
      <div class="text">
        learn more ->
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
  const shortTicker = props.ticker.split('.')[0] 
</script>
<style scoped lang="scss">
  
  .fund{
    text-decoration:none;
    display:grid;
    grid-template-columns: sizer(3) 1fr sizer(10);
    padding: sizer(1) sizer(1) sizer(1) sizer(1.5);
    line-height: sizer(4);
    @include border;
    @include hoverable;
    &:hover{
      cursor:pointer;
      @include hovering;
      .text{
        color:dark(100%);
      }
    }
  }
  .text{
    text-align:right;
    font-size:85%;
    color: dark(60%);
    margin-right:sizer(.5);
  }
  .name{
    text-decoration:none;
  }
  .icon span{
    height: sizer(4);
    width: sizer(2);
    display:block; 
    background-repeat: no-repeat;
    background-position: center;
    background-size:contain;
  }
</style>