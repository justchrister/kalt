<template>
  <div class="input-wrap">
    <label for="bankCode">Bank code (swift/bic)</label>
    <input type="text" v-model="bankCode" v-maska data-maska="@@@@ @@ ** ***" @input="updateBankCode()"/>
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
  const bankCode = ref(props.initialValue)
  if(props.initialValue) {
    ok.log('success', 'initial value: '+props.initialValue)
  }
  const updateBankCode = async () => {
    const { error, data } = await pub(supabase, {
      sender:'components/input/bankCode.vue'
    }).linkedBankAccount({
      userId: user.value.id,
      bankCode: bankCode.value
    });
    if(error) {
      ok.log('error', 'error updating bank code', error)
    } else{
      ok.log('success', 'updated bank code: '+bankCode.value)
    }
  }
</script>
<style scoped lang="scss">
  
</style>