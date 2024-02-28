<template>
  <main>
    <block>
      <h1>Where should we send the invite?</h1>
      <form @submit.prevent="requestInvite()">
        <div class="inputGroup">
          <input type="text" placeholder="First name" v-model="firstName" class="next" />
          <input type="text" placeholder="Last name" v-model="lastName" class="next" />
        </div>
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
  const firstName = ref('')
  const lastName = ref('')
  const supabase = useSupabaseClient()
  const requestUuid = useCookie('requestUuid')

  const requestInvite = async () => {

    const error = await pub(supabase, {
      "sender": "pages/invite/request/index.vue",
      "entity": requestUuid.value
    }).requestAccess({
      firstName: firstName.value,
      lastName: lastName.value
    });
    if (error) {
      ok.log('error', 'failed to request access ' + error.message)
    } else {
      ok.log('success', 'requested access')
    }
    navigateTo('/invite/request/country')
  }

</script>
<style scoped lang="scss">
  input {
    margin-bottom: sizer(1);
  }

  .inputGroup {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: sizer(1);
  }
</style>