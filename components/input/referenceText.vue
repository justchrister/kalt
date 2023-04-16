<template>
  <div class="input-wrap">
    <label for="reference">Reference text</label>
    <input type="text" v-model="reference" @input="updateReference()"/>
  </div>
</template>
<script setup lang="ts">
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const props = defineProps({
    initialValue: {
      type: String,
      required: false,
      default: null
    }
  })
  const reference = ref(props.initialValue)
  if(props.initialValue) {
    ok.log('success', 'initial value: '+props.initialValue)
  }

  const updateReference = async () => {
    const { data, error } = await supabase
      .from('linked_bank_accounts')
      .insert({
        message_sender: 'components/input/referenceText.vue',
        user_id: user.value.id,
        bank_code: reference.value
      })
    if(error) {
      ok.log('error', 'error updating reference', error)
    } else{
      ok.log('success', 'updated reference: '+reference.value)
    }
  }

</script>
<style scoped lang="scss">
  
</style>