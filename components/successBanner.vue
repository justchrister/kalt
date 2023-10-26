<template>
  <div class="wrap">
    <div class="success-text">successful.</div>
    <span class="shard top-left"></span>
    <span class="shard top-center-left"></span>
    <span class="shard top-center-right"></span>
    <span class="shard top-right"></span>
    <span class="shard bottom-right"></span>
    <span class="shard bottom-center-right"></span>
    <span class="shard bottom-center-left"></span>
    <span class="shard bottom-left"></span>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped lang="scss">
  $iteration: 8888;
  $from-scale: 0.8;
  $duration: 4s;
  $base-delay: 300ms;
  $timing-function: ease;
  .wrap{
    position:relative;
    font-size:$clamp-3-no-min;
    text-align:center;
    height:$clamp-30-no-min;
    background-image: url('/images/gradients/successAlt.svg');
    background-repeat:no-repeat;
    background-position:center;
    background-size:cover;
    line-height:$clamp-30-no-min;
  }
  .shard{
    position:absolute;
    display:block;
    width:$clamp-5-no-min;
    height:$clamp-5-no-min;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    animation-duration: $duration;
    animation-iteration-count: $iteration;
    animation-timing-function: $timing-function;
    &.top-left{
      animation-name: top-left;
      animation-delay: $base-delay + 230ms;
      top:$clamp-6-no-min;
      left:$clamp-10-no-min;
      background-image:url('/images/shards/shard-top-left.svg');
    }
    &.top-center-left{
      animation-name: top-center-left;
      animation-delay: $base-delay + 140ms;
      top:$clamp-4-no-min;
      left:$clamp-19-no-min;
      background-image:url('/images/shards/shard-top-center-left.svg');
    }
    &.top-center-right{
      animation-name: top-center-right;
      animation-delay: $base-delay + 110ms;
      top:$clamp-4-no-min;
      left:$clamp-30-no-min;
      background-image:url('/images/shards/shard-top-center-right.svg');
    }
    &.top-right{
      animation-name: top-right;
      animation-delay: $base-delay + 270ms;
      top:$clamp-8-no-min;
      left:$clamp-40-no-min;
      background-image:url('/images/shards/shard-top-right.svg');
    }
    &.bottom-right{
      animation-name: bottom-right;
      animation-delay: $base-delay + 210ms;
      top:$clamp-20-no-min;
      left:$clamp-40-no-min;
      background-image:url('/images/shards/shard-bottom-right.svg');
    }
    &.bottom-center-right{
      animation-name: bottom-center-right;
      animation-delay: $base-delay + 190ms;
      top:$clamp-22-no-min;
      left:$clamp-30-no-min;
      background-image:url('/images/shards/shard-bottom-center-right.svg');
    }
    &.bottom-center-left{
      animation-name: bottom-center-left;
      animation-delay: $base-delay + 130ms;
      top:$clamp-20-no-min;
      left:$clamp-15-no-min;
      background-image:url('/images/shards/shard-bottom-center-left.svg');
    }
    &.bottom-left{
      animation-name: bottom-left;
      animation-delay: $base-delay + 170ms;
      top:$clamp-16-no-min;
      left:$clamp-8-no-min;
      background-image:url('/images/shards/shard-bottom-left.svg');
    }
  }

  @keyframes top-left {
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
      transform:scale(1) translateX(1px) translateY(-1px);
    }
  }

  @keyframes top-center-left {
    20% {
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
      transform:scale(1) translateX(1px) translateY(-1px);
    }
  }

  @keyframes top-center-right {
    20% {
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
      transform:scale(1) translateX(1px) translateY(-1px);
    }
  }

  @keyframes top-right {
    20% {
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
      transform:scale(1) translateX(1px) translateY(-1px);
    }
  }

  @keyframes bottom-right {
    20% {
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
      transform:scale(1) translateX(1px) translateY(-1px);
    }
  }

    
  @keyframes bottom-center-right {
    20% {
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
      transform:scale(1) translateX(1px) translateY(-1px);
    }
  }

    
  @keyframes bottom-center-left {
    20% {
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
      transform:scale(1) translateX(1px) translateY(-1px);
    }
  }

    
  @keyframes bottom-left {
    20% {
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
      transform:scale(1) translateX(1px) translateY(-1px);
    }
  }
</style>