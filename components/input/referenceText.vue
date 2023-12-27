<template>
  <div class="input-wrap">
    <label for="reference">Reference text</label>
    <input type="text" 
           v-model="reference" 
           @input="updateReference()" 
           placeholder="My best investment ever"
           :class="state"/>
  </div>
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const auth = useSupabaseUser()
  const props = defineProps({
    initialValue: {
      type: String,
      required: false,
      default: null
    }
  })
  const state = ref('')
  const reference = ref(props.initialValue)
  if(props.initialValue) {
    ok.log('success', 'initial value: '+props.initialValue)
  }

  const updateReference = async () => {
    state.value = 'loading'
    const error = await pub(supabase, {
      entity: auth.value.id,
      sender:'components/input/referenceText.vue'
    }).linkedBankAccounts({
      userId: auth.value.id,
      reference: reference.value
    });
    if(error) {
      state.value = 'error'
      ok.log('error', 'error updating reference', error)
    } else{
      state.value = 'success'
      ok.log('success', 'updated reference: '+reference.value)
    }
  }

</script>
<style scoped lang="scss">
  
</style>