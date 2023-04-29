<template>
  <div class="input-wrap">
    <label for="bank_code">Bank code (swift/bic)</label>
    <input type="text" v-model="bank_code" @input="updateBankCode()"/>
  </div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const props = defineProps({
    initialValue: {
      type: String,
      required: false,
      default: null
    }
  })
  const bank_code = ref(props.initialValue)
  if(props.initialValue) {
    ok.log('success', 'initial value: '+props.initialValue)
  }
  const updateBankCode = async () => {
    const { data, error } = await supabase
      .from('linked_bank_accounts')
      .insert({
        message_sender: 'components/input/bankCode.vue',
        user_id: user.value.id,
        bank_code: bank_code.value
      })
    if(error) {
      ok.log('error', 'error updating bank code', error)
    } else{
      ok.log('success', 'updated bank code: '+bank_code.value)
    }
  }
</script>
<style scoped lang="scss">
  
</style>