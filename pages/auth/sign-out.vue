<template>
<h1> signing you out </h1>
</template>
<script lang="ts" setup>
  const supabase = useSupabaseClient()
  const router = useRouter()
  const { error } = await supabase.auth.signOut()
  if(!error){
    router.go(-1)
  }
</script>