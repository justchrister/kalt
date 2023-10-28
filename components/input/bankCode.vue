<template>
  <div class="input-wrap">
    <label for="bankCode">Bank code (swift/bic)</label>
    <input type="text" 
           v-model="bankCode" 
           v-maska data-maska="@@@@ @@ ** ***" 
           @input="updateBankCode()" 
           placeholder="KALT NO 11 234" 
           :class="state"/>
  </div>
</template>
<script setup>
  const supabase = useSupabaseClient()
  const userId = useSupabaseUser()
  const props = defineProps({
    initialValue: {
      type: String,
      required: false,
      default: null
    }
  })
  const state = ref('')
  const bankCode = ref(props.initialValue)
  if(props.initialValue) {
    ok.log('success', 'initial value: '+props.initialValue)
  }
  const updateBankCode = async () => {
    state.value = 'loading'
    const { error, data } = await pub(supabase, {
      entity: userId.value.id,
      sender:'components/input/bankCode.vue'
    }).linkedBankAccounts({
      userId: userId.value.id,
      bankCode: bankCode.value
    });
    if(error) {
      state.value = 'error'
      ok.log('error', 'error updating bank code', error)
    } else{
      state.value = 'success'
      ok.log('success', 'updated bank code: '+bankCode.value)
    }
  }
</script>
<style scoped lang="scss">
  
</style>