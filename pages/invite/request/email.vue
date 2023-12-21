<template>
  <main>
    <block>
      <h1>Where should we send the invite?</h1>

      <input type="text" placeholder="email" v-model="email" class="next"/>
      <button class="next" @click="requestInvite()"> Next -> </button>
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
  const email = ref('')
  const supabase = useSupabaseClient()
  const requestUuid = useCookie('requestUuid')

  const requestInvite = async () => {
    
    const { error, data } = await pub(supabase, {
      "sender":"pages/invite/request/index.vue",
      "entity": requestUuid.value
    }).requestAccess({
      email: email.value
    });
    if(error){
      ok.log('error', 'could not request access '+error.message)
    } else {
      ok.log('success', 'requested access')
    }
    navigateTo('/invite/request/name')
  }
  
</script>
<style scoped lang="scss">
  input{
    margin-bottom: sizer(1);
  }
</style>