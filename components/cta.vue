<template>
  <div class="cta">
    <nuxt-link to="/portfolio/invest">
      <button  :class="animatedClass" tabindex="-1">lets invest</button>
    </nuxt-link>
    <nuxt-link v-if="props.showDivest" to="portfolio/divest">or divest</nuxt-link>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  showDivest: {
    default: false,
    type: Boolean,
    required: false
  },
  animated: {
    default: true,
    type: Boolean,
    required: false
  }
})
  let animatedClass
  if(props.animated){
    animatedClass = "green-gradient"
  }
  const supabase = useSupabaseClient()

  const { data, error } = await supabase
    .from('cards')
    .select()
    .eq('default', true)
    .order('modified_at', { ascending: false })
    .single()
</script>