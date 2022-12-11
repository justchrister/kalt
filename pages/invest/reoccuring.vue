<script setup lang="ts">
const pagename = 'Set up reoccuring payments';
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
          <formsReoccuring />
          <a href="/invest/complete">
            <button>finish →</button>
          </a>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>