<template>
  <div>
    <nuxt-link to="/cards" v-if="data">
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
    .from('get_payment_card_default')
    .select()
    .limit(1)
    .single()
</script>
