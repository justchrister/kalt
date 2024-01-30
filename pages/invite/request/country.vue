<template>
  <main>
    <block>
      <h1>Where do you live?</h1>
      <input type="text" placeholder="Country" v-model="country" class="next" />
      <input-button @click="requestInvite()">next -></input-button>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Request invite'
  })
  useHead({
    title: 'Request invite',
    meta: [{
      name: 'description',
      content: 'Invest in the future, today.'
    }]
  })
  const country = ref('')
  const supabase = useSupabaseClient()
  const requestUuid = useCookie('requestUuid')

  const requestInvite = async () => {

    const error = await pub(supabase, {
      "sender": "pages/invite/request/index.vue",
      "entity": requestUuid.value
    }).requestAccess({
      country: country.value,
    });
    if (error) {
      ok.log('error', 'could not request access ' + error.message)
    } else {
      ok.log('success', 'requested access')
    }
    navigateTo('/success/request')
  }
</script>
<style scoped lang="scss">
  input {
    margin-bottom: sizer(1);
  }
</style>