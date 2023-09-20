<template>
  <main>
    <div class="star star1">
      <omoji emoji="✨" />
    </div>
    <div class="star star2">
      <omoji emoji="✨" />
    </div>
    <div class="star star3">
      <omoji emoji="✨" />
    </div>
    <block>
      <div class="rotater">
      </div>
      <button @click="goBack()"> ← back </button>
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
  const goBack = () => {
    clearTimeout(timer1)
    navigateTo('/portfolio')
  }
  var timer1 = setTimeout(goBack, 10000)
  */
</script>
<style scoped lang="scss">
  
  button{
    background: $blue-80;
    background: linear-gradient(90deg, $blue-80 0%, $blue-80 50%, $light 50%, $light 100%);
    background-size: 200% 200%;
    animation: loading 10s;
    &:hover{
      cursor: pointer;
      background: white;
    }
  }
  @keyframes loading {
    from {background-position:100% 50%}
    to {background-position:0% 50%}
  }
  .star{
    position: fixed;
  }
  .star1{
    top:20vh;
    left:20vw;
    font-size:$clamp-20;
  }
  .star2{
    font-size: $clamp-15;
    top: 50vh;
    left: 50vw;
  }
  .star3{
    font-size: $clamp-15;
    top: 10vh;
    left: 80vw;
  }

  .rotater{
    width:$clamp-20;
    height:$clamp-20;
    display:block;
    border:$border;
    border-radius:100%;
    margin: clamp($unit-min*1.4, $unit*1.4, $unit-max*1.4) $clamp;
    animation-name: example;
    animation-duration: 9s;
    animation-iteration-count: 99999;
  }
@keyframes example {
  0% {
    transform: scaleX(1) scaleY(1) scaleZ(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateX(0px) translateY(0px) translateZ(0px) skewX(0deg) skewY(0deg);
  }
  100% {
    transform: scaleX(1) scaleY(1) scaleZ(1) rotateX(177deg) rotateY(180deg) rotateZ(0deg) translateX(0px) translateY(0px) translateZ(0px) skewX(0deg) skewY(0deg);
  }
}
</style>