<template>
  <main>
    <block>
      <h1>Where should we send the invite?</h1>
      <form @submit.prevent="requestInvite()">
        <input type="text" placeholder="E-mail" v-model="email" class="next" />
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
  const email = ref('')
  const supabase = useSupabaseClient()
  const requestUuid = useCookie('requestUuid')

  const requestInvite = async () => {
    if (!email.value) return
    // match on email regex pattern
    if(!email.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) return
    const error = await pub(supabase, {
      "sender": "pages/invite/request/index.vue",
      "entity": requestUuid.value
    }).requestAccess({
      email: email.value
    });
    if (error) {
      ok.log('error', 'failed to requestInvite: ' + error.message)
    } else {
      ok.log('success', 'requested access')
    }
    navigateTo('/invite/request/name')
  }
</script>
<style scoped lang="scss">
  input {
    margin-bottom: sizer(1);
  }
</style>