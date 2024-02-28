<template>
  <main>
    <block>
      <h1> Welcome to the Kalt Club</h1>
      <label for="inviteCode">Personal invite code:</label>
      <input type="text" id="inviteCode" placeholder="Enter your invite code" v-model="inviteCode" />
      <input-button @click="startInvite()">next →</input-button>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Welcome!'
  })
  useSeoMeta({
    title: 'Accept invite',
    ogTitle: 'Kalt - Accept invite',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta-invite.png'
  })
  const route = useRoute()
  const inviteCode = ref(route.params.slug[0] || null)
  const startInvite = async () => {
    const { data, error } = await useFetch('/api/invites/validate?code=' + inviteCode.value, {
      method: 'POST'
    })
    const status = data?.value.status
    if (error.value) {
      return
    } else if (status === 'valid') {
      navigateTo('/invite/accept/auth')
    } else {
      return status
    }
  }
</script>
<style scoped lang="scss"></style>