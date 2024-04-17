<template>
  <modal title="this fund is still private" :show="show">
    <p> Want to join the waitlist? </p>
    <!-- <col n="2"> create this component too -->
      <input-button @click="show=false"> no </input-button>
      <input-button @click="joinWaitlist()"> yes <loading-icon v-if="loading"/> </input-button>
    <!-- </col> -->
  </modal>
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const props = defineProps({
    ticker: {
      type: String,
      required: true
    }, 
    user: {
      type: Object,
      required: true,
    }
  })
  const show = ref(true)
  const loading = ref(false)
  const joinWaitlist = async () => {
    loading.value = true
    const { data, error } = await supabase
      .from('fundInterest')
      .insert({
        id: props.user.id,
        ticker: props.ticker
      })
      .select()
    loading.value = false
  }
</script>
<style scoped lang="scss">
  
</style>