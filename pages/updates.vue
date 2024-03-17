<template>
  <main>
    <navbar-tabs />
    <block>      
      <span v-for="(update, index) in updates" :key="index">

        <update-single :id="update.id" :subject="update.subject" :ingress="update.ingress" category="general" date="01.01.2024" :read="false"/>
      </span>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Updates',
    middleware: 'auth'
  })
  useSeoMeta({
    title: 'Updates',
    ogTitle: 'Updates',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta.png'
  })

  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value);
  /*const updates = ref([
    {
      id: '1',
      subject: 'New update',
      ingress: 'This is a new update',
      category: 'general'
    }
  ])*/


  const updates = await get(supabase).updates(user);
  console.log(updates)
</script>
<style scoped lang="scss">
.update{
  margin-bottom:sizer(1);
}
</style>