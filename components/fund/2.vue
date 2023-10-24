<template>
    <div class="fund" v-if="fund">
      <div class="icon">
        <span :style="{ 'background-image': `url('/media/icons/funds/${shortTicker}.svg')` }"></span>
      </div>
      <div class="name">
        {{fund.name}}
      </div>
      <div class="rate">
  <nuxt-link :to="`/funds/${shortTicker}`">
        read more ->
  </nuxt-link>
      </div>
    </div>
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const userId = useSupabaseUser()
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
    grid-template-columns: $clamp-3 1fr $clamp-10;
    border:$border;
    padding:$clamp-1 $clamp-1 $clamp-1 $clamp-1-5;
    line-height:$clamp-4;
  }
  .rate,
  .name{
    text-decoration:none;
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