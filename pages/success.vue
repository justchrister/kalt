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
  $timing-function: steps(2);
  main{
    .block{
      position:relative;
      font-size:$clamp-5;
      text-align:center;
      height:$clamp-30;
      background-image: url('/images/gradients/successAlt.svg');
      background-repeat:no-repeat;
      background-position:center;
      background-size:cover;
    }
    .success-text{
      line-height:$clamp-30;
    }
    .shard{
      position:absolute;
      display:block;
      width:$clamp-5;
      height:$clamp-5;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      animation-duration: $duration;
      animation-iteration-count: $iteration;
      animation-timing-function: $timing-function;
      &.top-left{
        transform:scale($from-sclare) translateX($clamp-3) translateY($clamp-3);
        animation-name: top-left;
        animation-delay: $base-delay + 230ms;
        top:$clamp-6;
        left:$clamp-10;
        background-image:url('/images/shards/shard-top-left.svg');
      }
      &.top-center-left{
        transform:scale($from-sclare) translateX(0) translateY($clamp-3); 
        animation-name: top-center-left;
        animation-delay: $base-delay + 140ms;
        top:$clamp-4;
        left:$clamp-19;
        background-image:url('/images/shards/shard-top-center-left.svg');
      }
      &.top-center-right{
        transform:scale($from-sclare) translateX(0) translateY($clamp-3);
        animation-name: top-center-right;
        animation-delay: $base-delay + 110ms;
        top:$clamp-4;
        left:$clamp-30;
        background-image:url('/images/shards/shard-top-center-right.svg');
      }
      &.top-right{
        transform:scale($from-sclare) translateX($clamp-n-4) translateY($clamp-2-5);
        animation-name: top-right;
        animation-delay: $base-delay + 270ms;
        top:$clamp-8;
        left:$clamp-40;
        background-image:url('/images/shards/shard-top-right.svg');
      }
      &.bottom-right{
        transform:scale($from-sclare) translateX($clamp-n-1-5) translateY($clamp-n-3);
        animation-name: bottom-right;
        animation-delay: $base-delay + 210ms;
        top:$clamp-20;
        left:$clamp-41;
        background-image:url('/images/shards/shard-bottom-right.svg');
      }
      &.bottom-center-right{
        transform:scale($from-sclare) translateX($clamp-n-1-5) translateY($clamp-n-3);
        animation-name: bottom-center-right;
        animation-delay: $base-delay + 190ms;
        top:$clamp-22;
        left:$clamp-30;
        background-image:url('/images/shards/shard-bottom-center-right.svg');
      }
      &.bottom-center-left{
        transform:scale($from-sclare) translateX($clamp-1) translateY($clamp-n-3);
        animation-name: bottom-center-left;
        animation-delay: $base-delay + 130ms;
        top:$clamp-20;
        left:$clamp-15;
        background-image:url('/images/shards/shard-bottom-center-left.svg');
      }
      &.bottom-left{
        transform:scale($from-sclare) translateX($clamp-4) translateY($clamp-n-3);
        animation-name: bottom-left;
        animation-delay: $base-delay + 170ms;
        top:$clamp-16;
        left:$clamp-8;
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
</style>