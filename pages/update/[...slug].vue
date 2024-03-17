<template>
  <main>
    <block>
      <span v-for="(message, index) in messages" :key="index" :class="'sent '+message.type">
        <chat-answer v-if="message.type==='answer'">{{ message.text }}</chat-answer>
        <chat-link v-if="message.type==='link'" :to="message.url">{{ message.text }}</chat-link>
        <chat-image v-if="message.type==='image'" :url="message.url"></chat-image>
        <chat-question v-if="message.type==='question'">{{ message.text }}</chat-question>
      </span>
    </block>
  </main>
</template>
<script lang="ts" setup>
  definePageMeta({
    pagename: 'Update'
  })
  useSeoMeta({
    title: 'Update',
    ogTitle: 'Update',
    description: 'Real assets, real impact.',
    ogDescription: 'Real assets, real impact.',
    ogImage: 'https://ka.lt/images/meta.png'
  })
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value);
  const route = useRoute()

  const storedUpdateId = route.params.slug[0] || ''
  const update = await get(supabase).update(user, storedUpdateId)
  const messages = update.messages

  const markAsRead = async () => {
    if(update.read) return
    const error = await pub(supabase, {
      sender:'pages/update/[...slug].vue',
      id: storedUpdateId
    }).update({
      userId: user.id,
      read: true
    });
  }
  await markAsRead()
</script>
<style scoped lang="scss"></style>