<template>
  <main>
    <block>
      <h1>Classify artworks</h1>
    <hq-classify-artwork 
      v-for="artwork of artworks" 
      :key="artwork.id" 
      :data="artwork.data"/>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Classify: Art',
    middleware: 'auth-hq'
  })
  useHead({
    title: 'Classify: Art',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
  const supabase = useSupabaseClient()
  const artworks = await get(supabase).data('artwork');
</script>
<style scoped lang="scss">

</style>