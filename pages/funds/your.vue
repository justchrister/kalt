<template>
  <main>
    <intro title="Build your own fund" paragraph="Choose what you want to invest in both through your subscription and when completing single investments." />
    <block>
      <fund-your ticker="ffe"/>
      <fund-your ticker="art"/>
      <fund-your ticker="ah"/>
      <fund-your ticker="vc"/>
      <block>
        <div class="button-group">
          <button @click="navigateTo('/invest/auto')"> auto investments -> </button>
          <button @click="navigateTo('/invest')"> invest now -> </button>
        </div>
      </block>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Your fund',
    middleware: 'auth'
  })
  useHead({
    title: 'Your fund',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
  let amounts = reactive({
    art: 2,
    ffe: 3,
    ah: 1,
    vc: 0,
    smb: 1
  })
  const adjustAmount = (fund) => {
    if(amounts[fund]===3){
      amounts[fund] = 0
    } else {
      amounts[fund] = amounts[fund] + 1
    }
  }
</script>
<style scoped lang="scss">
  .button-group{
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: sizer(1);
  }
  main{
    padding-top:0;
  }
</style>