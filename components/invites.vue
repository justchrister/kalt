<template>
  <div class="invites">
    <p>Invite some friends</p>
    <invite v-for="invite in invites" :key="invite.code" :code="invite.code" v-if="invites.length"/>
    <input-button @click="requestInvities()" ><loading-icon v-if="loading"/> request more invites</input-button>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    user: {
      type: Object,
      required: true
    }
  })
  const loading = ref(false)
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const user = await get(supabase).user(auth.value)
  const { data: invites, error } = await supabase
    .from('topic_invites')
    .select()
    .eq('issuedTo', props.user.id)
    .limit(3)
  const requestInvities = async () => {
    loading.value = true
    const { data, error } = await supabase
      .from('topic_inviteRequests')
      .insert({
        id: user.id,
        sender: 'components/invites.vue'
      })
      .select()
    if(error) ok.log('error', 'error in requesting more invites: '+error.message)
    await ok.sleep(200);
    loading.value = false
  }
</script>
<style scoped lang="scss">
  .invite{
    margin-bottom: sizer(.75);
  }
</style>