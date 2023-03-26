<template>
  {{calculateAvocado()}}
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const { data: account } = await supabase.from('account').select()
  const calculateAvocado = async () => {
    return 1920
  }
</script>
<style scoped lang="scss">
</style>