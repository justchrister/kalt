<template>
  <main>
    <block>
      <chat-answer>
        Thank you for your interest in Kalt. We are currently in closed beta, but we are working hard to get you in as soon as possible. We will notify you as soon as we are ready for you.
      </chat-answer>
    </block>
    <block>
      You are receiving this because you are a part of the following user cohorts: 
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Update'
  })
  useHead({
    title: 'Update',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
  const route = useRoute()
  const inviteCode = ref(route.params.slug[0] || null)
  ok.log('', inviteCode.value)
  const startInvite = async () => {
    const { data, error } = await useFetch('/api/invites/validate?code=' + inviteCode.value, {
      method: 'POST'
    })
    const status = data?.value.status
    if (error.value) {
      ok.log('', 'im here')
      return
    } else if (status === 'valid') {
      ok.log('', status)
      navigateTo('/invite/accept/auth')
    } else {
      ok.log('', status)
      return status
    }
  }
</script>
<style scoped lang="scss"></style>