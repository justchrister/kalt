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
    height: sizer(2.5);
    padding: sizer(1);
    font-weight: 600;
    border-bottom: $border;
    &:hover{
      cursor:pointer;
    }
  }
  .body-wrapper {
    display: grid;
    max-width: sizer(55);
    overflow:hidden;
    height: sizer(9);
    grid-template-columns: 1fr sizer(9);
  }
  .description{
    border-bottom: $border;
    max-width: sizer(44);
    overflow:hidden;
    padding: sizer(1);
    white-space: nowrap;
    max-width: sizer(46);
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
    text-align: center;
    height: sizer(5);
    line-height: sizer(4.5);
    &:hover{
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .body{
    border-right: $border;
    height: sizer(9);
    max-width: sizer(46);
  }
  .symbol{
    background-repeat: no-repeat;
    background-size: contain;
    margin: sizer(2);
  }
</style>