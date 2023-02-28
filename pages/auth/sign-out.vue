<template>
<h1> signing you out </h1>
</template>
<script lang="ts" setup>
  const supabase = useSupabaseClient()
  const { error } = await supabase.auth.signOut()
</script>