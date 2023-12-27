<template>
  <div class="input-wrap">
    <toggle text="Subscription active" :on="isOn" @click="toggleSubscription()"/>
  </div>
</template>
<script setup lang="ts">
  const props = defineProps({
    on: {
      type: Boolean,
      required: false
    }
  })
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const isOn = ref()
  if(props.on) isOn.value = props.on
  const toggleValue = async () => {
    if(isOn.value) {
      ok.log('', 'Subscription toggled off')
      return false
    } else {
      ok.log('', 'Subscription toggled on')
      return true
    }
  }
  const toggleSubscription = async () => {
    const toggledValue = await toggleValue()
    isOn.value = toggledValue
    const error = await pub(supabase, {
      sender:'components/toggle/invest/auto.vue',
      entity: auth.value.id
    }).userSubscriptions({
      userId: auth.value.id,
      active: isOn.value
    });
  }
</script>
