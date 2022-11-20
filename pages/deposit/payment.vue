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
        navigateTo('/authenticate')
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
          <nav>
            <ul>
              <li>
                Invoice
              </li>
              <li>
                Credit card
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>