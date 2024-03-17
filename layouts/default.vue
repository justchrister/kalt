<template>
  <div class="container">
    <SpeedInsights />
    <navbar-top />
    <slot></slot>
    <navbar-bottom />
    <update-fixed :count="updateCount" />
  </div>
</template>
<script lang="ts" setup>
  import { SpeedInsights } from '@vercel/speed-insights/vue';
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  ok.log('', auth.value)
  const user = await get(supabase).user(auth.value);

  const updateCount = ref(0)
  
  const fetchUpdates = async () => {
    const { data, error } = await supabase
      .from('topic_updates')
      .select()
      .eq('userId', user.id)
    if (error) {
      console.error(error)
      return
    }
    const merged = ok.merge(data, 'id')
    const filtered = merged.filter((update: any) => !update.read) || 0;
    updateCount.value = filtered.length
  }
// fetch updates every 3 seconds
  fetchUpdates()
  setInterval(fetchUpdates, 3000)

</script>