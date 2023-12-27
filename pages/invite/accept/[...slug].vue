<template>
  <main>
    <block> 
      <h1> Welcome to the Kalt Club</h1>
      <label for="inviteCode">Personal invite code:</label>
      <input type="text" id="inviteCode" placeholder="Enter your invite code" v-model="inviteCode"/>
      <input-button @click="startInvite()">next →</input-button>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Welcome!'
  })
  useHead({
    title: 'Welcome!',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
  const route = useRoute()
  const inviteCode = ref(route.params.slug[0] || null)
  const startInvite = async () => {
    return
  }
</script>
<style scoped lang="scss">
  
</style>