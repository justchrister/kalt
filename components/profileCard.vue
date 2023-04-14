<template>
  <div class="profile-card">
    <div class="image">
    </div>
    <div class="name">
      {{ data.first_name }} {{ data.last_name }} 
    </div>
    <div class="profile-card__body__bio">
      {{ data.bio }}
    </div>
    <div class="location">
      {{ data.city }}, {{ data.country }}
    </div>
  </div>
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const { data, error } = await supabase
    .from('get_user')
    .select()
    .limit(1)
    .single()
</script>
<style scoped lang="scss">
  
</style>