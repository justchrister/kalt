<template>
  <main>
    <block>
      <h1> Legally required </h1>
      <p> We are legally required to collect some info about you and where your money is coming from. We've made it as easy as possible and it only takes a couple of minutes to do. </p>
      <div class="bar one">
      </div>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'KYC',
    middleware: 'auth'
  })
  useHead({
    title: 'KYC',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
  
</script>
<style scoped lang="scss">
  .bar{
    background: linear-gradient(90deg, green(10%) 0%, green(10%) 45%, green(10%) 45%, green(10%) 100%);
    border-radius:$border-radius;
    width:100%;
    height: sizer(1);
    display:block;
    &.one{
      background: linear-gradient(90deg, green(80%) 0%, green(80%) 20%, green(10%) 20%, green(10%) 100%);
    }
  }
</style>