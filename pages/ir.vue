<template>
  <main>
    <block>
      <h1> Interested in becoming an owner of Kalt? </h1>
      <form>
        <p> We are currently raising a round of funding. If you are interested in becoming an owner of Kalt. </p>
        <input type="phonenumber" placeholder="Phone number"><input-button>Request more information</input-button>
      </form>
    </block>
    <block>
      <h2>Updates</h2>
      <update-single subject="Kalt raises $1M in seed funding" date="2022-01-01" category="performance" ingress="xxxx."/>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Investor relations'
  })
  useHead({
    title: 'Investor relations',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
  
</script>
<style scoped lang="scss">
  
</style>