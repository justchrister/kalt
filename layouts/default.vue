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
  const auth = useSupabaseUser();
  
  const updateCount = ref(0)
  
  const fetchUpdates = async (userId: string) => {
    if(!userId) return
    const { data, error } = await supabase
      .from('topic_updates')
      .select()
      .eq('userId', userId)
    if (error) {
      updateCount.value = 0 
      return
    }

    const merged = ok.merge(data, 'id')
    const filtered = merged.filter((update: any) => !update.read);

    if(filtered && filtered.length>=1){
      updateCount.value = filtered.length
    } else {
      updateCount.value = 0
    }
    return
  };
  let intervalId = '';
  if(auth.value && auth.value.id) {
    intervalId = setInterval(() => fetchUpdates(auth.value.id), 500)
  };
</script>