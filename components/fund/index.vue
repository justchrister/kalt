<template>
  <div class="wrapper">
    <div class="heading">
      <div :class="checkableClass+' title '+checkedClass" @click="checkIt()">
        {{ fund.name }}
      </div>
    </div>
    <div class="body-wrapper">
      <div class="body">
        <div class="description">
          {{ fund.description}}
        </div>
        <nuxt-link :to="fund.url">
          <div class="button">
            read more ->
          </div>
        </nuxt-link>
      </div>
      <div class="symbol" :id="fund.shortTicker"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    ticker: {
      type: String,
      required: true
    },
    checkable: {
      type: Boolean,
      required: false,
      default: false
    },
    checked: {
      type: Boolean,
      required: false,
      default: false
    }
  });

  let fund = {
    ticker: props.ticker,
    shortTicker: props.ticker.split('.')[0],
    url: '/funds/'+props.ticker,
    name: 'Art fund',
    description: 'description'
  };
  if(props.ticker==='ffe.ddf'){
    fund.name='Fossil-free energy fund'
    fund.description='description'
  }
  if(props.ticker==='gi.ddf'){
    fund.name='100 Global Vision'
    fund.description='description'
  }
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
  .title.checkable{
    padding-left: $clamp-4;
    background-repeat: no-repeat;
    background-size: $clamp-2;
    background-position: $clamp-1;
    background-image: url('/omoji/check-bg.svg')
  }
  .title.checkable.checked{
    background-image: url('/omoji/check.svg')
  }
  .body-wrapper {
    display: grid;
    height: $clamp-9;
    grid-template-columns: 1fr $clamp-9;
  }
  .description{
    border-bottom: $border;
    padding: $clamp-1;
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
    &#art{
      background-image: url('/media/icons/funds/art.svg');
    }
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