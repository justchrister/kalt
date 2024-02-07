<template>
  <div class="invites">
    <p>Invites</p>
    <invite v-for="invite in invites" :key="invite.code" :code="invite.code" />
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    user: {
      type: Object,
      required: true
    }
  })
  const supabase = useSupabaseClient()
  const { data: invites, error } = await supabase
    .from('topic_invites')
    .select()
    .eq('issuedTo', props.user.id)
</script>
<style scoped lang="scss">
  .invite{
    margin-bottom: sizer(.75);
  }
</style>