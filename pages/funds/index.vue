<template>
  <main>
    <intro title="Our direct dividend funds."
      paragraph="We have a few speciailized funds that let you invest in a variety of different asset classes. By building your own diversified fund you can invest in all of these." />
    <block v-for="fund of funds" :key="fund.ticker" margin="2">
      <fund :ticker="fund.ticker" />
    </block>
    <block>
      <input-button link="/invest">invest now -></input-button>
    </block>
  </main>
</template>
<script lang="ts" setup>
  const supabase = useSupabaseClient()
  definePageMeta({
    pagename: 'Funds'
  })
  useHead({
    title: 'Funds',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
  useSeoMeta({
    title: 'Kalt — Funds',
    ogTitle: 'Kalt — Funds',
    description: 'Our AI powered value funds.',
    ogDescription: 'Our AI powered value funds.',
    ogImage: 'https://ka.lt/images/meta-funds.png'
  })
  const funds = await get(supabase).funds() as fund[];
</script>
<style scoped lang="scss">
  main {
    padding-top: 0;
  }
</style>