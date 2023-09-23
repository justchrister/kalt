<template>
  <main>
    <block>
      <div class="success-text">Success</div>
      <span class="shard top-left"></span>
      <span class="shard top-center-left"></span>
      <span class="shard top-center-right"></span>
      <span class="shard top-right"></span>
      <span class="shard bottom-right"></span>
      <span class="shard bottom-center-right"></span>
      <span class="shard bottom-center-left"></span>
      <span class="shard bottom-left"></span>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Success',
    middleware: 'auth'
  })
  useHead({
    title: 'Success',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })
/*
  const router = useRouter()

  const goBack = () => {
    clearTimeout(timer1)
    router.go(-2)
  }
  var timer1 = setTimeout(goBack, 3000)
  */
</script>
<style scoped lang="scss">
  $iteration: 8888;
  $from-sclare: 0.8;
  $duration: 4s;
  $base-delay: 700ms;
  $timing-function: ease;
  main{
    margin-top:0;
    padding-top:45vh;
    .block{
      font-size:$clamp-5;
      text-align:center;
    }
    .success-text{
        transform:scale($from-sclare) translateY($clamp-3);
        opacity:0;
        animation-name: success-text;
        animation-duration: $duration;
        animation-delay: $base-delay - 100ms;
        animation-iteration-count: $iteration;
        animation-timing-function: $timing-function;
    }
    .shard{
      position:absolute;
      width:$clamp-5;
      height:$clamp-5;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      top:40vh;
      left:50vw;
      &.top-left{
        transform:scale($from-sclare) translateX($clamp-3) translateY($clamp-3);
        animation-name: top-left;
        animation-duration: $duration;
        animation-delay: $base-delay + 230ms;
        animation-iteration-count: $iteration;
        animation-timing-function: $timing-function;
        margin-top:$clamp-n-6;
        margin-left:$clamp-n-33;
        background-image:url('/images/shards/shard-top-left.svg');
      }
      &.top-center-left{
        transform:scale($from-sclare) translateX(0) translateY($clamp-3); 
        animation-name: top-center-left;
        animation-duration: $duration;
        animation-delay: $base-delay + 140ms;
        animation-iteration-count: $iteration;
        animation-timing-function: $timing-function;
        margin-top:$clamp-n-11;
        margin-left:$clamp-n-14;
        background-image:url('/images/shards/shard-top-center-left.svg');
      }
      &.top-center-right{
        transform:scale($from-sclare) translateX(0) translateY($clamp-3);
        animation-name: top-center-right;
        animation-duration: $duration;
        animation-delay: $base-delay + 110ms;
        animation-iteration-count: $iteration;
        animation-timing-function: $timing-function;
        margin-top:$clamp-n-11;
        margin-left:$clamp-5;
        background-image:url('/images/shards/shard-top-center-right.svg');
      }
      &.top-right{
        transform:scale($from-sclare) translateX($clamp-n-4) translateY($clamp-2-5);
        animation-name: top-right;
        animation-duration: $duration;
        animation-delay: $base-delay + 270ms;
        animation-iteration-count: $iteration;
        animation-timing-function: $timing-function;
        margin-top:$clamp-n-4;
        margin-left:$clamp-14;
        background-image:url('/images/shards/shard-top-right.svg');
      }
      &.bottom-right{
        transform:scale($from-sclare) translateX($clamp-n-1-5) translateY($clamp-n-3);
        animation-name: bottom-right;
        animation-duration: $duration;
        animation-delay: $base-delay + 210ms;
        animation-iteration-count: $iteration;
        animation-timing-function: $timing-function;
        margin-top:$clamp-7;
        margin-left:$clamp-14;
        background-image:url('/images/shards/shard-bottom-right.svg');
      }
      &.bottom-center-right{
        transform:scale($from-sclare) translateX($clamp-n-1-5) translateY($clamp-n-3);
        animation-name: bottom-center-right;
        animation-duration: $duration;
        animation-delay: $base-delay + 190ms;
        animation-iteration-count: $iteration;
        animation-timing-function: $timing-function;
        margin-top:$clamp-14;
        margin-left:$clamp-3;
        background-image:url('/images/shards/shard-bottom-center-right.svg');
      }
      &.bottom-center-left{
        transform:scale($from-sclare) translateX($clamp-1) translateY($clamp-n-3);
        animation-name: bottom-center-left;
        animation-duration: $duration;
        animation-delay: $base-delay + 130ms;
        animation-iteration-count: $iteration;
        animation-timing-function: $timing-function;
        margin-top:$clamp-14;
        margin-left:$clamp-n-15;
        background-image:url('/images/shards/shard-bottom-center-left.svg');
      }
      &.bottom-left{
        transform:scale($from-sclare) translateX($clamp-4) translateY($clamp-n-3);
        animation-name: bottom-left;
        animation-duration: $duration;
        animation-delay: $base-delay + 170ms;
        animation-iteration-count: $iteration;
        animation-timing-function: $timing-function;
        margin-top:$clamp-8;
        margin-left:$clamp-n-32;
        background-image:url('/images/shards/shard-bottom-left.svg');
      }
    }
  }
  
  @keyframes top-left {
    0% {
      transform:scale($from-sclare) translateX($clamp-3) translateY($clamp-3);
    }
    10% {
      transform:scale(1) translateX(0) translateY(0);
      animation-timing-function: linear;
    }
    20% {
      transform:scale(1) translateX(1px) translateY(2px);
    }
    30% {
      transform:scale(1) translateX(2px) translateY(-1px);
    }
    40% {
      transform:scale(1) translateX(1px) translateY(-1px);
    }
    50% {
      transform:scale(1) translateX(2px) translateY(-1px);
    }
    60% {
      transform:scale(1) translateX(2px) translateY(-2px);
    }
    70% {
      transform:scale(1) translateX(2px) translateY(-3px);
    }
    80% {
      animation-timing-function: linear;
      transform:scale(1) translateX(1px) translateY(-1px);
    }
    90% {
      animation-timing-function: $timing-function;
      transform:scale(1) translateX(0) translateY(0);
    }
    100% {
      transform:scale($from-sclare) translateX($clamp-3) translateY($clamp-3);
    }
  }
  
  @keyframes top-center-left {
    0% {
      transform:scale($from-sclare) translateX(0) translateY($clamp-3); 
    }
    10% {
      transform:scale(1) translateX(0) translateY(0);
    }
    20% {
      animation-timing-function: linear;
      transform:scale(1) translateX(0px) translateY(1px);
    }
    30% {
      transform:scale(1) translateX(-1px) translateY(0px);
    }
    40% {
      transform:scale(1) translateX(-1px) translateY(1px);
    }
    50% {
      transform:scale(1) translateX(0px) translateY(1px);
    }
    60% {
      transform:scale(1) translateX(0px) translateY(2px);
    }
    70% {
      transform:scale(1) translateX(1px) translateY(2px);
    }
    80% {
      animation-timing-function: linear;
      transform:scale(1) translateX(1px) translateY(-1px);
    }
    90% {
      transform:scale(1) translateX(0) translateY(0);
    }
    100% {
      transform:scale($from-sclare) translateX(0) translateY($clamp-3);
    }
  }
  
  @keyframes top-center-right {
    0% {
      transform:scale($from-sclare) translateX(0) translateY($clamp-3);
    }
    10% {
      transform:scale(1) translateX(0) translateY(0);
    }
    20% {
      animation-timing-function: linear;
      transform:scale(1) translateX(1px) translateY(2px);
    }
    30% {
      transform:scale(1) translateX(2px) translateY(1px);
    }
    40% {
      transform:scale(1) translateX(2px) translateY(-1px);
    }
    50% {
      transform:scale(1) translateX(1px) translateY(-1px);
    }
    60% {
      transform:scale(1) translateX(1px) translateY(-2px);
    }
    70% {
      transform:scale(1) translateX(2px) translateY(-3px);
    }
    80% {
      animation-timing-function: linear;
      transform:scale(1) translateX(1px) translateY(-1px);
    }
    90% {
      transform:scale(1) translateX(0) translateY(0);
    }
    100% {
      transform:scale($from-sclare) translateX(0) translateY($clamp-3);
    }
  }
  
  @keyframes top-right {
    0% {
      transform:scale($from-sclare) translateX($clamp-n-4) translateY($clamp-2-5);
    }
    10% {
      transform:scale(1) translateX(0) translateY(0);
    }
    20% {
      animation-timing-function: linear;
      transform:scale(1) translateX(1px) translateY(1px);
    }
    30% {
      transform:scale(1) translateX(2px) translateY(1px);
    }
    40% {
      transform:scale(1) translateX(1px) translateY(1px);
    }
    50% {
      transform:scale(1) translateX(2px) translateY(2px);
    }
    60% {
      transform:scale(1) translateX(2px) translateY(2px);
    }
    70% {
      transform:scale(1) translateX(1px) translateY(2px);
    }
    80% {
      animation-timing-function: linear;
      transform:scale(1) translateX(1px) translateY(-1px);
    }
    90% {
      transform:scale(1) translateX(0) translateY(0);
    }
    100% {
      transform:scale($from-sclare) translateX($clamp-n-4) translateY($clamp-2-5);
    }
  }
  
  @keyframes bottom-right {
    0% {
      transform:scale($from-sclare) translateX($clamp-n-3) translateY($clamp-n-3);
    }
    10% {
      transform:scale(1) translateX(0) translateY(0);
    }
    20% {
      animation-timing-function: linear;
      transform:scale(1) translateX(1px) translateY(2px);
    }
    30% {
      transform:scale(1) translateX(2px) translateY(1px);
    }
    40% {
      transform:scale(1) translateX(2px) translateY(-1px);
    }
    50% {
      transform:scale(1) translateX(1px) translateY(-1px);
    }
    60% {
      transform:scale(1) translateX(1px) translateY(-2px);
    }
    70% {
      transform:scale(1) translateX(2px) translateY(-3px);
    }
    80% {
      animation-timing-function: linear;
      transform:scale(1) translateX(1px) translateY(-1px);
    }
    90% {
      transform:scale(1) translateX(0) translateY(0);
    }
    100% {
      transform:scale($from-sclare) translateX($clamp-n-3) translateY($clamp-n-3);
    }
  }

    
  @keyframes bottom-center-right {
    0% {
      transform:scale($from-sclare) translateX($clamp-n-1-5) translateY($clamp-n-3);
    }
    10% {
      transform:scale(1) translateX(0) translateY(0);
    }
    20% {
      animation-timing-function: linear;
      transform:scale(1) translateX(1px) translateY(2px);
    }
    30% {
      transform:scale(1) translateX(2px) translateY(1px);
    }
    40% {
      transform:scale(1) translateX(2px) translateY(-1px);
    }
    50% {
      transform:scale(1) translateX(1px) translateY(-1px);
    }
    60% {
      transform:scale(1) translateX(1px) translateY(-2px);
    }
    70% {
      transform:scale(1) translateX(2px) translateY(-3px);
    }
    80% {
      animation-timing-function: linear;
      transform:scale(1) translateX(1px) translateY(-1px);
    }
    90% {
      transform:scale(1) translateX(0) translateY(0);
    }
    100% {
      transform:scale($from-sclare) translateX($clamp-n-1-5) translateY($clamp-n-3);
    }
  }

    
  @keyframes bottom-center-left {
    0% {
      transform:scale($from-sclare) translateX($clamp-1) translateY($clamp-n-3);
    }
    10% {
      transform:scale(1) translateX(0) translateY(0);
    }
    20% {
      animation-timing-function: linear;
      transform:scale(1) translateX(1px) translateY(2px);
    }
    30% {
      transform:scale(1) translateX(2px) translateY(1px);
    }
    40% {
      transform:scale(1) translateX(2px) translateY(-1px);
    }
    50% {
      transform:scale(1) translateX(1px) translateY(-1px);
    }
    60% {
      transform:scale(1) translateX(1px) translateY(-2px);
    }
    70% {
      transform:scale(1) translateX(2px) translateY(-3px);
    }
    80% {
      animation-timing-function: linear;
      transform:scale(1) translateX(1px) translateY(-1px);
    }
    90% {
      transform:scale(1) translateX(0) translateY(0);
    }
    100% {
      transform:scale($from-sclare) translateX($clamp-1) translateY($clamp-n-3);
    }
  }

    
  @keyframes bottom-left {
    0% {
      transform:scale($from-sclare) translateX($clamp-4) translateY($clamp-n-3);
    }
    10% {
      transform:scale(1) translateX(0) translateY(0);
    }
    90% {
      transform:scale(1) translateX(0) translateY(0);
    }
    100% {
      transform:scale($from-sclare) translateX($clamp-4) translateY($clamp-n-3);
    }
  }
  
  @keyframes success-text{
    0% {
      transform:scale($from-sclare) translateY($clamp-3);
      opacity:0;
    }
    10% {
      transform:scale(1) translateX(0) translateY(0);
        opacity:1;
    }
    90% {
      transform:scale(1) translateX(0) translateY(0);
        opacity:1;
    }
    100% {

transform:scale($from-sclare) translateY($clamp-3);
        opacity:0.5;
    }
  }
</style>