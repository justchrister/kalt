<template>
  <main>
    <block>
      <h1> What should we call you?</h1>
      <form @submit.prevent="next()">
        <div class="inputGroup">
          <input-user :user="user" id="firstName" />
          <input-user :user="user" id="lastName" />
        </div>
        <input-button>next →</input-button>
      </form>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Name',
    middleware: 'auth'
  })
  useSeoMeta({
    title: 'Accept invite',
    ogTitle: 'Kalt - Accept invite',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta.png'
  })
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value) as user;
  const next = () => { navigateTo('/invite/accept/legal') };
</script>
<style scoped lang="scss">
  .inputGroup {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: sizer(1);
  }
</style>