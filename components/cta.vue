<template>
  <nuxt-link to="/portfolio/buy" >
    <button tabindex="-1">lets invest</button>
  </nuxt-link>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()

const { data, error } = await supabase
  .from('cards')
  .select()
  .eq('default', true)
  .order('modified_at', { ascending: false })
  .single()
console.log(data)
</script>