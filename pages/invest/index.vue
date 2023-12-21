<template>
  <main>
    <block>
      <div class="wrapper">
        <div class="column" @click="navigateTo('/invest/onetime')"> 
          <div class="title">One time investment</div>
          <div class="explainer"> Invest a single amount in your personalized fund</div>
          <div class="link"> Start -> </div>
        </div>
        <div class="column" @click="navigateTo('/invest/auto')"> 
          <div class="title">Automatic investments</div>
          <div class="explainer">Set up a daily, weekly, or monthly recurring investment</div>
          <div class="link"> Start -> </div>
        </div>
      </div>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Invest',
    middleware: 'auth'
  })
  useHead({
    title: 'Invest',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
  
</script>
<style scoped lang="scss">
  .wrapper{
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: sizer(1);
    .column{
      border: 1px solid $dark-40;
      border-radius: 3px;
      padding: sizer(1) sizer(1.5);
      height: sizer(20);
      text-align: left;
      .title{

      margin-bottom: sizer(1);
      }
      .link{
        text-align:right;
      }
    }
  }
</style>