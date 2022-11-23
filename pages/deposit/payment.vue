<script setup lang="ts">
  const pagename = 'Deposit';
  const title = 'Kalt — ' + pagename;
  const description = ref('My App Description')

  useHead({
    title,
    meta: [{
      name: 'description',
      content: description
    }]
  })

  definePageMeta({
    middleware: ['auth']
  })

  const client = useSupabaseClient()
  const user = useSupabaseUser()

  onMounted(() => {
    watchEffect(() => {
      if (!user.value) {
        navigateTo('/account/sign-in')
      }
    })
  })


</script>
<template>
  <div class="PageWrapper">
    <Kaltmenu :pageTitle='pagename' />
    <div class="page">
      <div class="section">
        <div class="block">
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>