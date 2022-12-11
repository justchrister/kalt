<script setup lang="ts">
const pagename = 'Add a payment card';
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
      navigateTo('/authenticate/sign-up')
    }
  })
})
</script>
<template>
  <div class="PageWrapper">
    <Kaltmenu :pageTitle='pagename' />
    <div class="page">
      <div class="section">
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>