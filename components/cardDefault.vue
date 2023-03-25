<template>
  <div>
    <nuxt-link to="/cards" v-if="card">
      <card :number="card.card_number" :default="card.default" />
    </nuxt-link>
    <nuxt-link to="/cards/add" v-else>
      <div class="card no-card">
        no card found, add one <omoji emoji="→"/>
      </div>
    </nuxt-link>
  </div>
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()

  const { data: card } = await useLazyAsyncData('card', async () => {
    const { data, error } = await supabase
      .from('cards')
      .select()
      .eq('default', true)
      .order('modified_at', { ascending: false })
      .single()
    return data
  })

</script>
