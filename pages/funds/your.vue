<template>
  <main>
    <intro title="Build your own fund" paragraph="Choose what you want to invest in both through your subscription and when completing single investments."/>
    <block>
      <fund-your ticker="ffe"/>
      <fund-your ticker="art"/>
      <fund-your ticker="ah" :beta="true"/>
      <fund-your ticker="smb" :beta="true"/>
      <fund-your ticker="vc" :beta="true"/>
      <block>
        <input-button link="/invest">invest now -></input-button>
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