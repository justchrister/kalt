<template>
  <main>
    <block>
      <h1>Where do you live?</h1>
      <form @submit.prevent="requestInvite()">
        <input type="text" placeholder="Country" v-model="country" class="next" />
        <input-button>next -></input-button>
      </form>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Request invite'
  })
  
  useSeoMeta({
    title: 'Request invite',
    ogTitle: 'Kalt - Request invite',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta.png'
  })
  const country = ref('')
  const supabase = useSupabaseClient()
  const requestUuid = useCookie('requestUuid')

  const requestInvite = async () => {
    if(!country.value) return
    const error = await pub(supabase, {
      "sender": "pages/invite/request/index.vue",
      "entity": requestUuid.value
    }).requestAccess({
      country: country.value,
    });
    if (error) {
      ok.log('error', 'failed to requestInvite: ' + error.message)
    } else {
      ok.log('success', 'requested access')
    }
    navigateTo('/invite/request/success')
  }
</script>
<style scoped lang="scss">
  input {
    margin-bottom: sizer(1);
  }
</style>