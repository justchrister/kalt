<script setup lang="ts">
const pagename = 'Investment complete';
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
    <navbar :pageTitle='pagename' />
    <div class="page">
      <div class="section">
        <div class="frame">
          <div class="image" style="background-image:url('/images/dall-e/hockney_pool.png');"></div>
          <div class="image" style="background-image:url('/images/dall-e/basq2.png');"></div>
        </div>
        <div class="block">
          <h1> Congratulations on your first investment! </h1>
          <p> now you can do stuff! </p>
          <a href="/account/portfolio">
            <button>
            see your impact here
            </button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>