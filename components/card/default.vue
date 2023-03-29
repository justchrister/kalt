<template>
  <div>
    <nuxt-link to="/cards" v-if="card">
      <card :number="data.card_number" :default="data.default" />
    </nuxt-link>
    <span v-else>
      <card-add/>
    </span>
  </div>
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
