
<template>
  <main>
    <block>
      <h1 class="sans-serif" style="font-size: 300%;">
        Invest in the <strong>future</strong>, today.
      </h1>
      <nuxt-link to="/invest-flow">
        <h1 class="sans-serif" style="font-size: 300%;">
          start →
        </h1>
      </nuxt-link>
    </block>
  </main>
</template>
<script setup lang="ts">
  definePageMeta({
    pagename: 'Homepage'
  })
  useHead({
    title: 'Kalt',
    meta: [{
      name: "description",
      content: "Make money, make a difference."
    }]
  })
</script>