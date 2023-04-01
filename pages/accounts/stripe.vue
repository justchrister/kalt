<template>
  <main>
      
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Stripe',
    middleware: 'auth'
  })
  useHead({
    title: 'Kalt — Stripe',
    meta: [{
      name: 'description',
      content: 'Make money, make a difference.'
    }]
  })
  
  mounted() {
    if (this.$stripe) {
      const elements = this.$stripe.elements();
      const card = elements.create('card', {});
      // Add an instance of the card Element into the `card-element` <div>
      card.mount('#card-element');
    }
  },
</script>
<style scoped lang="scss">
  
</style>