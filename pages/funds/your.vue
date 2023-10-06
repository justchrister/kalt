<template>
  <main>
    <intro title="Build your own fund" paragraph="Choose what you want to invest in both through your subscription and when completing single investments." />
    <block>
      <fund-your ticker="ffe.ddf"/>
      <fund-your ticker="art.ddf"/>
      <fund-your ticker="ah.ddf"/>
      <fund-your ticker="vc.ddf"/>
      <button @click="navigateTo('/invest')">
        invest now
      </button>
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
      content: 'Make money, make a difference.'
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
main{
  padding-top:0;
}
</style>