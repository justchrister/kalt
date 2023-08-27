<template>
  <main>
    <frame-wrap>
      <frame-image src="/media/images/celebrate_tumbl_aesthetic.png" />
    </frame-wrap>
    <block>
      <h1> Card added successfully <omoji emoji="✨" /></h1>
      <p> You have successfully invested in the future of fossil-free energy. Sit back, relax, and let the markets do its magic. We will keep you upated. </p>
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

  const goBack = () => {
    clearTimeout(timer1)
    navigateTo('/cards')
  }
  var timer1 = setTimeout(goBack, 10000)  

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
</style>