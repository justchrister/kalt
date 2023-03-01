<template>
<h1> signing you out </h1>
</template>
<script lang="ts" setup>
  const supabase = useSupabaseClient()
  const client = useSupabaseAuthClient()
  const { error } = await client.auth.signOut()
  if(!error) navigateTo('/')
</script>