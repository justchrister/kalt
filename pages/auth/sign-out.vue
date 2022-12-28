<script lang="ts" setup>
  const supabase = useSupabaseClient()
  const { error } = await supabase.auth.signOut()
  console.log(error)
</script>
<template>
  <h1> {{error}} </h1>
</template>