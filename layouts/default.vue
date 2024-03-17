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
      .eq('read', false)
      .eq('userId', user.id)
    if (error) {
      console.error(error)
      return
    }
    updateCount.value = data.length
  }
// fetch updates every 3 seconds
  fetchUpdates()
  setInterval(fetchUpdates, 3000)

</script>