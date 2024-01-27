<template>
  <div class="wrap">
    hello
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
  ok.log(supabase)
</script>
<style scoped lang="scss">
  
</style>