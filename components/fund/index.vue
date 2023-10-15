<template>
  <div class="wrapper" v-if="data">
    <div class="heading">
      <div class="title" @click="checkIt()">
        {{ data.name }}
      </div>
    </div>
    <div class="body-wrapper">
      <div class="body">
        <div class="description">
          <div>
          {{ data.description}}
          </div>
        </div>
        <nuxt-link :to="'funds/'+shortTicker">
          <div class="button">
            read more ->
          </div>
        </nuxt-link>
      </div>
      <div class="symbol" :style="{ 'background-image': `url('/media/icons/funds/${shortTicker}.svg')` }"></div>
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
  });
  const shortTicker = props.ticker.split('.')[0];
  const { data, error } = await supabase
    .from('sys_funds')
    .select()
    .eq('ticker', props.ticker)
    .limit(1)
    .single();
</script>
<style scoped lang="scss">
  .wrapper{
    display: block;
    border: $border;
  }
  .title {
    height: $clamp-2-5;
    padding: $clamp-1;
    font-weight: 600;
    border-bottom: $border;
    &:hover{
      cursor:pointer;
    }
  }
  .body-wrapper {
    display: grid;
    height: $clamp-9;
    grid-template-columns: 1fr $clamp-9;
  }
  .description{
    border-bottom: $border;
    max-width:$clamp-44;
    overflow:hidden;
    padding: $clamp-1;
    white-space: nowrap;
    div{
      animation: animate_text 30s linear infinite; /* The animation property */
    }

  }
  @keyframes animate_text {
    from {
      transform: translate3d(0, 0, 0);
    }
    to {
      transform: translate3d(-100%, 0, 0);
    }
  }
  a{
    text-decoration: none;
  }
  .button{
    padding: $clamp-1;
    text-align: center;
    &:hover{
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .body{
    border-right: $border;
    height: $clamp-9;
  }
  .symbol{
    background-repeat: no-repeat;
    background-size: contain;
    margin: $clamp-2;
  }
  .read-more-adjust-percentage{
    display:grid;
    grid-template-columns: 1fr 1fr;

  }
  .adjust-percent-wrapper{
    display:grid;
    grid-template-columns: 1fr $clamp-5 $clamp-5;
    user-select: none;
    span{
      display:inline-block;
      border:none;
      border-left:$border;
      padding:$clamp-1 0;
      min-width:$clamp-4;
      box-sizing: border-box;
      user-select: none;
      height:100%;
      text-align:center;
      &:hover{
        cursor: pointer;
        background:white;
      }
      &:first-child{
        border-left:none;
        text-align: left;
        padding-left: $clamp-2;
      }
    }
    button:hover,
    button:active,
    button:focus{
      border-radius:0;
    }
  }
</style>