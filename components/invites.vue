<template>
  <div class="invites">
    <p>Invite some friends</p>
    <invite v-for="invite in invites" :key="invite.code" :code="invite.code" />
    <!-- 
      If there are no invites, there should be a button to request more. 
    -->
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